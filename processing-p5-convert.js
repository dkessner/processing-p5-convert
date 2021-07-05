//
// processing_p5_convert.js
//


export {
    reconstructJava, 
    transformJava, 
    transformProcessing,
    printRawProcessingFile,
    transformProcessingFile,
    reconstructProcessingFile
};

import { parse } from 'java-parser';

import js from 'js-beautify';
const beautify = js['js'];

import { readFileSync } from 'fs';


// recursion implementation

function visitChildren(node, level, doSomething, options, data)
{
    for (const nodeName in node.children)
    {
        const childArray = node.children[nodeName];

        for (const index in childArray)
        {
            visitNodesRecursive(childArray[index], level, doSomething, options, data);
        }
    }
}

function visitNodesRecursive(node, level, doSomething, options, data)
{
    const shouldRecurse = doSomething(node, level, options, data);

    if (shouldRecurse)
        visitChildren(node, level+1, doSomething, options, data);
}


// raw code extraction

function printName(node, level, options, data) {
    if ("name" in node)
        console.log(" ".repeat(level) + node.name);
    else if ("image" in node)
        console.log(" ".repeat(level) + node.image);

    return true;
}

const printCstNodeTree = cst => visitNodesRecursive(cst, 0, printName, null, null);


// special node handlers for extractCodeVisitor()

function handle_fqnOrRefType(node, level, options, data) {

    // fqnOrRefType nodes store stuff in arrays, so we need to reconstruct:
    //
    // System.out.println ->
    //
    //  fqnOrRefTypePartFirst: "System"
    //  fqnOrRefTypePartRest: ["out", "println"]
    //  Dot: [".", "."]
    //

    // sanity check

    const ok = "fqnOrRefTypePartFirst" in node.children;
    const multiple = ("Dot" in node.children && "fqnOrRefTypePartRest" in node.children);

    if (!ok)
    {
        console.log("[handle_fqnOrRefType] I am insane!");
        return;
    }

    // extract the first part

    let temp = {code:""};
    visitNodesRecursive(node.children.fqnOrRefTypePartFirst["0"], level+1, extractCodeVisitor, options, temp);

    // extract the rest, iterating through the dot and rest arrays in parallel

    if (multiple)
    {
        const dotArray = node.children.Dot;
        const restArray = node.children.fqnOrRefTypePartRest;

        if (dotArray.length !== restArray.length)
        {
            console.log("[handle_fqnOrRefType] Array lengths do not match.");
            return;
        }

        for (const index in dotArray)
        {
            visitNodesRecursive(dotArray[index], level+1, extractCodeVisitor, options, temp);
            visitNodesRecursive(restArray[index], level+1, extractCodeVisitor, options, temp);
        }
    }

    // save extracted code

    data.code += temp.code;
}

function handle_argumentList(node, level, options, data) {
    //
    // argumentList stores arguments and commas in separate arrays
    //
    // argumentList (420, 666)
    //  Comma: [\,]
    //  expression: [420, 666]
    //

    // sanity check

    const ok = "expression" in node.children;
    const multiple = "Comma" in node.children;

    if (!ok)
    {
        console.log("[handle_argumentList] I am insane!");
        return;
    }

    // extract the first part

    const expressionArray = node.children.expression;
    const commaArray = "Comma" in node.children ? node.children.Comma : null;

    let temp = {code:""};

    for (const index in expressionArray)
    {
        visitNodesRecursive(expressionArray[index], level+1, extractCodeVisitor, options, temp);
        if (commaArray !== null && index in commaArray)
            visitNodesRecursive(commaArray[index], level+1, extractCodeVisitor, options, temp);
    }

    // save extracted code

    data.code += temp.code;
}

function handle_binaryOperator(node, level, options, data) {
    //
    // binaryExpression stores binary operator and arguments in separate arrays
    //
    // binaryExpression x < width + 10
    //  BinaryOperator: [<, +]
    //  unaryExpression: [x, width, 10]
    //

    // sanity check

    const ok = "BinaryOperator" in node.children && 
               "unaryExpression" in node.children && 
                node.children.BinaryOperator.length >= 1 &&
                node.children.unaryExpression.length === node.children.BinaryOperator.length + 1;

    if (!ok)
    {
        console.log("[handle_binaryOperator] I am insane!");
        return;
    }

    const binaryOperatorArray = node.children.BinaryOperator;
    const unaryExpressionArray = node.children.unaryExpression;

    let temp = {code:""};

    for (const index in binaryOperatorArray)
    {
        visitNodesRecursive(unaryExpressionArray[index], level+1, extractCodeVisitor, options, temp);
        visitNodesRecursive(binaryOperatorArray[index], level+1, extractCodeVisitor, options, temp);
    }
    visitNodesRecursive(unaryExpressionArray[unaryExpressionArray.length-1], level+1, extractCodeVisitor, options, temp);

    data.code += temp.code;
}


function handle_basicForStatement(node, level, options, data) {

    const ok = "For" in node.children &&
               "LBrace" in node.children &&
               "RBrace" in node.children &&
               "Semicolon" in node.children && node.children.Semicolon.length === 2 &&
               "expression" in node.children &&
               "forInit" in node.children &&
               "forUpdate" in node.children &&
               "statement" in node.children;

    if (!ok)
    {
        console.log("[handle_basicForStatement] I am insane!");
        return;
    }

    visitNodesRecursive(node.children.For[0], level+1, extractCodeVisitor, options, data);
    visitNodesRecursive(node.children.LBrace[0], level+1, extractCodeVisitor, options, data);
    visitNodesRecursive(node.children.forInit[0], level+1, extractCodeVisitor, options, data);
    visitNodesRecursive(node.children.Semicolon[0], level+1, extractCodeVisitor, options, data);
    visitNodesRecursive(node.children.expression[0], level+1, extractCodeVisitor, options, data);
    visitNodesRecursive(node.children.Semicolon[1], level+1, extractCodeVisitor, options, data);
    visitNodesRecursive(node.children.forUpdate[0], level+1, extractCodeVisitor, options, data);
    visitNodesRecursive(node.children.RBrace[0], level+1, extractCodeVisitor, options, data);
    visitNodesRecursive(node.children.statement[0], level+1, extractCodeVisitor, options, data);
}

// TODO: deprecated

function transformCodeFromCST(cst)
{
    let classBodyNode = getClassBodyNode(cst);
    let transformedCode = {code: ""};
    visitNodesRecursive(classBodyNode, 0, appendAndTransformCode, null, transformedCode);
    return transformedCode.code;
}

// primary node visitor for code reconstruction/transformation

function extractCodeVisitor(node, level, options, result) // TODO new code here
{
    if ("image" in node) // actual code is stored as node["image"]
    {
        result.code += node.image + " ";
        return true;
    }

    if (!("name" in node)) return true;

    if (node.name === "fqnOrRefType")
    {
        let temp = {code:""};
        handle_fqnOrRefType(node, level, options, temp);

        if (options.transform) {
            if (temp.code === "size ")
                temp.code = "createCanvas "; // transform: size -> createCanvas
        }

        result.code += temp.code;
        return false; // treat special nodes as terminal
    }
    else if (node.name === "argumentList")
    {
        handle_argumentList(node, level, options, result);
        return false;
    }
    else if (node.name === "result")
    {
        // transform function result type depending on context
        // - global:  void/int/... -> function
        // - class: void/int/... -> ""

        if (options.transform === true) {
            if (options.classDeclaration !== true) {
                result.code +=  "function "; 
            }
            return false;
        }
    }
    else if (node.name === "binaryExpression" && "BinaryOperator" in node.children)
    {
        handle_binaryOperator(node, level, options, result);
        return false;
    }
    else if (node.name === "basicForStatement")
    {
        handle_basicForStatement(node, level, options, result);
        return false;
    }
    else if (node.name === "unannType" && options.transform)
    {
        // transform field declarations depending on context:
        // - global: int/float/... -> let
        // - class:  int/float/... -> ""

        if (options.classDeclaration !== true)
            result.code += "let ";

        return false;
    }
    else if (node.name === "classDeclaration")
    {
        let newOptions = {classDeclaration: true};
        Object.assign(newOptions, options);
        visitChildren(node, level+1, extractCodeVisitor, newOptions, result);

        return false;
    }
    else if (node.name === "constructorDeclarator")
    {
        let newOptions = {constructorDeclarator: true};
        Object.assign(newOptions, options);
        visitChildren(node, level+1, extractCodeVisitor, newOptions, result);

        return false;
    }
    else if (node.name === "simpleTypeName" && options.constructorDeclarator === true)
    {
        result.code += "constructor";
        return false;
    }

    return true;
}

// helper functions

function getClassBody(node, level, options, data) {
    if ("name" in node && node.name == "classBody")
    {
        data["node"] = node;
        return false;
    }
    return true;
}

function getClassBodyNode(cst)
{
    let classBody = {}
    visitNodesRecursive(cst, 0, getClassBody, null, classBody);
    return classBody.node;
}


// main entry function to visit cst

function extractCodeFromCST(cst, options)
{
    let result = {code: ""};
    let root = cst;

    if (options.ignoreOuterClass) 
        root = getClassBodyNode(cst);

    visitNodesRecursive(root, 0, extractCodeVisitor, options, result);

    if (options.ignoreOuterClass) 
        result.code = result.code.trim().slice(1,-1); // remove braces

    return beautify(result.code);
}


// top-level functions


function reconstructJava(code)  // TODO: test
{
    const options = {
        transform: false,
        ignoreOuterClass: false
    };

    return extractCodeFromCST(parse(code), options);
}


const transformJava = code => transformCodeFromCST(parse(code));
//const transformJava = code => extractCodeFromCST(parse(code), {transform: true});
// TODO


function printRawProcessing(code)
{
    const wrapped = "public class Dummy {" + code + "}";
    const cst = parse(wrapped);
    printCstNodeTree(cst);
}


function transformProcessing(code)
{
    const wrapped = "public class Dummy {" + code + "}";
    const cst = parse(wrapped);

    const options = {
        transform: true,
        ignoreOuterClass: true
    };

    return extractCodeFromCST(cst, options);
}


function reconstructProcessing(code)
{
    const wrapped = "public class Dummy {" + code + "}";
    const cst = parse(wrapped);

    const options = {
        transform: false,
        ignoreOuterClass: true
    };

    return extractCodeFromCST(cst, options);
}


function applyToFile(filename, transformation)
{
    try 
    {
        const input = readFileSync(filename, 'utf8')
        const output = transformation(input);
        return output;
    } 
    catch (err) 
    {
        console.error("[applyToFile] " + err.message)
    }
}


const printRawProcessingFile = filename => applyToFile(filename, printRawProcessing);
const transformProcessingFile = filename => applyToFile(filename, transformProcessing);
const reconstructProcessingFile = filename => applyToFile(filename, reconstructProcessing);


if (typeof(module) !== 'undefined')
{
    module.exports = 
    { 
        reconstructJava, 
        transformJava, 
        transformProcessing,
        printRawProcessingFile,
        transformProcessingFile,
        reconstructProcessingFile,
    };

    console.log("processing-p5js-convert");
}


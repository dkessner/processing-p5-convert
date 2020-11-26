//
// processing_p5_convert.js
//


export {
    printCST, 
    reconstructJava, 
    transformJava, 
    transformProcessing
};


import { 
    parse, 
    BaseJavaCstVisitor, 
    BaseJavaCstVisitorWithDefaults } from 'java-parser';


import js from 'js-beautify';
const beautify = js['js'];


// extract raw code from nodes with "image" keys

function extractCodeRecursive(object, text)
{
    for (const thing in object)
    {
        if (thing === "image")
        {
            text = text + object[thing] + " ";
        }
        else if (typeof object[thing] === "object")
        {
            text = extractCodeRecursive(object[thing], text);
        }
    }

    return text;
}

const extractCode = cst => extractCodeRecursive(cst, "");


function printCstNode(node, level)
{
    if (!('name' in node)) return;

    console.log(" ".repeat(level) + node.name + " " + extractCode(node)); // doubly recursive

    for (const nodeName in node.children)
    {
        const childArray = node.children[nodeName];

        for (const index in childArray)
        {
            printCstNode(childArray[index], level+1);
        }
    }
}

const printCst = cst => printCstNode(cst, 0);


function visitNodesRecursive(node, level, doSomething, data)
{
    const shouldRecurse = doSomething(node, level, data);

    if (shouldRecurse)
    {
        for (const nodeName in node.children)
        {
            const childArray = node.children[nodeName];

            for (const index in childArray)
            {
                visitNodesRecursive(childArray[index], level+1, doSomething, data);
            }
        }
    }
}

function printName(node, level, data) {
    if ("name" in node)
        console.log(" ".repeat(level) + node.name);

    return true;
}

const printCstNodeTree = cst => visitNodesRecursive(cst, 0, printName, null);

const printCST = code => printCstNodeTree(parse(code));


function appendCode_fqnOrRefType(node, level, data) {

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
        console.log("[appendCode_fqnOrRefType] I am insane!");
        return;
    }

    // extract the first part

    let temp = {code:""};
    visitNodesRecursive(node.children.fqnOrRefTypePartFirst["0"], level+1, appendCode, temp);

    // extract the rest, iterating through the dot and rest arrays in parallel

    if (multiple)
    {
        const dotArray = node.children.Dot;
        const restArray = node.children.fqnOrRefTypePartRest;

        if (dotArray.length !== restArray.length)
        {
            console.log("[appendCode_fqnOrRefType] Array lengths do not match.");
            return;
        }

        for (const index in dotArray)
        {
            visitNodesRecursive(dotArray[index], level+1, appendCode, temp);
            visitNodesRecursive(restArray[index], level+1, appendCode, temp);
        }
    }

    // save extracted code

    data.code += temp.code;
}

function appendCode_argumentList(node, level, data) {
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
        console.log("[appendCode_argumentList] I am insane!");
        return;
    }

    // extract the first part

    const expressionArray = node.children.expression;
    const commaArray = "Comma" in node.children ? node.children.Comma : null;

    let temp = {code:""};

    for (const index in expressionArray)
    {
        visitNodesRecursive(expressionArray[index], level+1, appendCode, temp);
        if (commaArray !== null && index in commaArray)
            visitNodesRecursive(commaArray[index], level+1, appendCode, temp);
    }

    // save extracted code

    data.code += temp.code;
}

function appendCode(node, level, data) {
    if ("name" in node && node.name == "fqnOrRefType")
    {
        appendCode_fqnOrRefType(node, level, data);
        return false; // treat special nodes as terminal
    }
    else if ("name" in node && node.name == "argumentList")
    {
        appendCode_argumentList(node, level, data);
        return false;
    }
    else if ("image" in node) // actual code is stored as node["image"]
    {
        data.code += node.image + " ";
    }
    return true;
}


function reconstructCodeFromCST(cst)
{
    let reconstructedCode = {code: ""};
    visitNodesRecursive(cst, 0, appendCode, reconstructedCode);   
    return reconstructedCode.code;
}

const reconstructJava = code => reconstructCodeFromCST(parse(code));

function appendAndTransformCode(node, level, data) {
    if ("name" in node && node.name == "fqnOrRefType")
    {
        let temp = {code:""};
        appendCode_fqnOrRefType(node, level, temp);

        if (temp.code === "size ")
            temp.code = "createCanvas "; // transform: size -> createCanvas

        data.code += temp.code;
        return false;
    }
    else if ("name" in node && node.name == "argumentList")
    {
        appendCode_argumentList(node, level, data);
        return false;
    }
    else if ("name" in node && node.name == "result")
    {
        data.code +=  "function "; // transform: void/int/... -> function
        return false;
    }
    else if ("image" in node)
    {
        data.code += node.image + " ";
    }
    return true;
}

function getClassBody(node, level, data) {
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
    visitNodesRecursive(cst, 0, getClassBody, classBody);
    return classBody.node;
}

function transformCodeFromCST(cst)
{
    let classBodyNode = getClassBodyNode(cst);
    let transformedCode = {code: ""};
    visitNodesRecursive(classBodyNode, 0, appendAndTransformCode, transformedCode);
    return transformedCode.code;
}

const transformJava = code => transformCodeFromCST(parse(code));

function transformProcessing(code)
{
    const js = transformJava("public class Dummy {" + code + "}").trim();
    const unbraced = js.slice(1, js.length-1);
    return beautify(unbraced);
}


if (typeof(module) !== 'undefined')
{
    module.exports = 
    { 
        printCST, 
        reconstructJava, 
        transformJava, 
        transformProcessing
    };

    console.log("processing-p5js-convert");
}


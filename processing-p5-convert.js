//
// processing_p5_convert.js
//


export {
    printRawProcessing,
    printOutlineProcessing,
    transformProcessing,
    reconstructProcessing
};

import { parse } from 'java-parser';

import js from 'js-beautify';
const beautify = js['js'];


// recursion implementation

function visitChildren(node, level, doSomething, options, context, data)
{
    for (const nodeName in node.children)
    {
        const childArray = node.children[nodeName];

        for (const index in childArray)
        {
            visitNodesRecursive(childArray[index], level, doSomething, options, context, data);
        }
    }
}

function visitNodesRecursive(node, level, doSomething, options, context, data)
{
    const shouldRecurse = doSomething(node, level, options, context, data);

    if (shouldRecurse)
        visitChildren(node, level+1, doSomething, options, context, data);
}


// raw code extraction

function cstPrintRawVisitor(node, level, options, data) {
    if ("name" in node)
        console.log(" ".repeat(level) + node.name);
    else if ("image" in node)
        console.log(" ".repeat(level) + node.image);

    return true;
}

const cstPrintRaw = cst => visitNodesRecursive(cst, 0, cstPrintRawVisitor, null, null, null);

function printRawProcessing(code)
{
    const preprocessed = preprocessProcessing(code);
    const cst = parse(preprocessed);
    cstPrintRaw(cst);
}



// special node handlers for extractCodeVisitor()


//
// variableDeclaratorList: "mouseX, mouseY"
//  - variableDeclarator: [mouseX, mouseY]
//  - Comma: [\,]
//
// fqnOrRefType: "System.out.println"
//  - fqnOrRefTypePartFirst: "System"
//  - fqnOrRefTypePartRest: ["out", "println"]
//  - Dot: [".", "."]
//
// binaryExpression: "x < width + 10"
//  - unaryExpression: [x, width, 10]
//  - BinaryOperator: [<, +]
//
// argumentList: "(420, 666)"
//  - expression: [420, 666]
//  - Comma: [\,]
//

function visitChildrenInterleaved(node, zeroth, first, second, 
                                  level, options, context, result) 
{
    // visit zeroth

    if (zeroth && zeroth in node.children)
        visitNodesRecursive(node.children[zeroth][0], level+1, extractCodeVisitor, options, context, result);

    // interleave first and second

    let firstArray = first in node.children ? node.children[first] : null;
    if (!firstArray) return;

    let secondArray = second in node.children ? node.children[second] : null;
    
    for (const index in firstArray)
    {
        visitNodesRecursive(firstArray[index], level+1, extractCodeVisitor, options, context, result);
        if (secondArray !== null && index in secondArray)
            visitNodesRecursive(secondArray[index], level+1, extractCodeVisitor, options, context, result);
    }
}


function extractCodeVisitor_basicForStatement(node, level, options, context, data) 
{
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
        console.log("[processing-p5-convert] handle_basicForStatement not ok");
        return;
    }

    visitNodesRecursive(node.children.For[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.LBrace[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.forInit[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.Semicolon[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.expression[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.Semicolon[1], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.forUpdate[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.RBrace[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.statement[0], level+1, extractCodeVisitor, options, context, data);

    return false;
}

function extractCodeVisitor_ifStatement(node, level, options, context, data) 
{
    const ok = "If" in node.children &&
               "LBrace" in node.children &&
               "RBrace" in node.children &&
               "expression" in node.children &&
               "statement" in node.children;

    if (!ok)
    {
        console.log("[processing-p5-convert] handle_ifStatement not ok");
        return;
    }

    visitNodesRecursive(node.children.If[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.LBrace[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.expression[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.RBrace[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.statement[0], level+1, extractCodeVisitor, options, context, data);

    if ("Else" in node.children)
    {
        visitNodesRecursive(node.children.Else[0], level+1, extractCodeVisitor, options, context, data);
        visitNodesRecursive(node.children.statement[1], level+1, extractCodeVisitor, options, context, data);
    }

    return false;
}


function registerField(node, context, result)
{
    const ok = "unannType" in node.children && "variableDeclaratorList" in node.children;

    if (!ok) 
    {
        console.log("[processing-p5-convert] registerField not ok");
        return;
    }

    const tempOptions = {
        transform: false,
        ignoreOuterClass: false
    };

    const type = cstExtractCode(node.children.unannType[0], tempOptions);

    if (type.startsWith("ArrayList"))
    {
        result.arrayListReference = true;
    }
}

// visitor for cstExtractCode


function extractCodeVisitor_image(node, level, options, context, result)
{
    if (options.transform === true)
    {
        // transform:  member variables in class method body x -> this.x

        if (context.methodBody === true && 
            "memberVariables" in context && 
            context.memberVariables.includes(node.image))
        {
            result.code += "this." + node.image + " ";
            return;
        }

        // transform: for each loop : -> of

        else if (context.enhancedForStatement === true &&
            node.image === ":")
        {
            result.code += "of ";  
            return;
        }
    }

    // default: actual code string is stored in node.image

    result.code += node.image + " ";

    return true;
}


function extractCodeVisitor_fqnOrRefType(node, level, options, context, result)
{
    let temp = {code:""};
    
    visitChildrenInterleaved(node, "fqnOrRefTypePartFirst", 
                             "Dot","fqnOrRefTypePartRest",
                             level+1, options, context, temp); 

    if (options.transform) {
        if (temp.code === "size ")
            temp.code = "createCanvas "; // transform: size -> createCanvas
        else if (temp.code === "println ")
            temp.code = "console.log "; // transform println -> console.log
        else if (temp.code === "UP ")
            temp.code = "UP_ARROW ";
        else if (temp.code === "DOWN ")
            temp.code = "DOWN_ARROW ";
        else if (temp.code === "RIGHT ")
            temp.code = "RIGHT_ARROW ";
        else if (temp.code === "LEFT ")
            temp.code = "LEFT_ARROW ";
        else if (context.insideSetup === true && temp.code.startsWith("load"))
            context.isLoadFile = true; 
        else if (temp.code === "createFont ")
        {
            temp.code = "loadFont ";
            context.isLoadFile = true; 
            context.isCreateFont = true;
        }
    }

    result.code += temp.code;

    return false;
}

function extractCodeVisitor_argumentList(node, level, options, context, result)
{
    let temp = {code:""};
    
    visitChildrenInterleaved(node, "", "expression", "Comma",
                             level+1, options, context, temp); 

    if (options.transform === true)
    {   
        if (context.isCreateFont === true)
        {
            // transform: truncate argumentList in createFont
            //  createFont("filename.otf",24) -> loadFont("filename.otf")
            let comma = temp.code.indexOf(",");
            temp.code = temp.code.slice(0, comma);
            context.isCreateFont = false;
        }
    }

    result.code += temp.code;

    return false;
}

function extractCodeVisitor_variableDeclaratorList(node, level, options, context, result)
{
    visitChildrenInterleaved(node, "", "variableDeclarator", "Comma",
                             level+1, options, context, result); 

    return false;
}

function extractCodeVisitor_result(node, level, options, context, result)
{
    // transform function result type depending on context
    // - global:  void/int/... -> function
    // - class: void/int/... -> ""

    if (options.transform === true) 
    {
        if (context.classDeclaration !== true) 
        {
            result.code +=  "function "; 
        }
        return false;
    }
    
    return true;
}

function extractCodeVisitor_binaryExpression(node, level, options, context, result)
{
    if ("BinaryOperator" in node.children)
    {
        visitChildrenInterleaved(node, "", "unaryExpression", "BinaryOperator",
                                 level+1, options, context, result); 
        return false;
    }

    return true;
}

function extractCodeVisitor_enhancedForStatement(node, level, options, context, result)
{
    visitChildren(node, level+1, extractCodeVisitor, 
        options, {...context, enhancedForStatement:true}, result);
    return false;
}

function extractCodeVisitor_fieldDeclaration(node, level, options, context, result)
{
    visitChildren(node, level+1, extractCodeVisitor, 
            options, {...context, fieldDeclaration:true}, result);

    if (options.transform === true)
        registerField(node, context, result);

    return false;
}


function extractCodeVisitor_unannType(node, level, options, context, result)
{
    if (options.transform)
    {
        // transform field declarations depending on context:
        // - global: int/float/... -> let
        // - class:  int/float/... -> ""

        if (context.classDeclaration !== true)
            result.code += "let ";

        return false;
    }

    return true;
}

function extractCodeVisitor_variableDeclarator(node, level, options, context, result)
{
    // if we're declaring a variable in a class, save it to the memberVariables list

    if (context.classDeclaration === true && context.fieldDeclaration === true)
    { 
        // look ahead...
        let variableNameContainer = {code: ""};
        visitChildren(node, level, extractCodeVisitor, options, context, variableNameContainer);
        let variableName = variableNameContainer.code.split(' ')[0];
        context.memberVariables.push(variableName);
    }
    
    return true;  // ...but keep going      
}

function extractCodeVisitor_classDeclaration(node, level, options, context, result)
{
    let newContext = {
        ...context, 
        classDeclaration: true,
        memberVariables: []
    };

    visitChildren(node, level+1, extractCodeVisitor, options, newContext, result);
    return false;
}

function extractCodeVisitor_constructorDeclarator(node, level, options, context, result)
{
    visitChildren(node, level+1, extractCodeVisitor, 
        options, {...context, constructorDeclarator:true}, result);
    return false;
}

function extractCodeVisitor_methodBody(node, level, options, context, result)
{
    if (context.classDeclaration === true)
    {
        visitChildren(node, level+1, extractCodeVisitor, 
            options, {...context, methodBody:true}, result);
        return false;
    }

    return true;
}

function extractCodeVisitor_simpleTypeName(node, level, options, context, result)
{
    if (options.transform === true && context.constructorDeclarator === true)
    {
        result.code += "constructor"; // transform: ClassName() -> constructor()
        return false;
    }

    return true;
}

function extractCodeVisitor_newExpression(node, level, options, context, result)
{
    if (options.transform === true)
    {
        let ok = "unqualifiedClassInstanceCreationExpression" in node.children &&
            "classOrInterfaceTypeToInstantiate" in node.children.unqualifiedClassInstanceCreationExpression[0].children;

        let className = {code:""};
        let start = node.children.unqualifiedClassInstanceCreationExpression[0].children.classOrInterfaceTypeToInstantiate[0];
        visitNodesRecursive(start, level+1, extractCodeVisitor, options, context, className);

        if (className.code.startsWith("ArrayList"))
        {
            // transform: ArrayList<ClassName> -> ArrayList
            result.code += "new ArrayList()"; 
            return false;
        }
    }

    return true;
}

function extractCodeVisitor_methodDeclaration(node, level, options, context, result)
{
    let newContext = {...context, methodDeclaration: true};

    visitChildren(node, level+1, extractCodeVisitor, 
        options, newContext, result);

    if (options.transform === true && 
        newContext.insideSetup === true && 
        newContext.preload)
    {
        result.code += "function preload() {" + newContext.preload + "}";
    }

    return false;
}

function extractCodeVisitor_methodDeclarator(node, level, options, context, result)
{
    if (context.classDeclaration !== true && context.methodDeclaration === true)
    {
        const methodName = node.children.Identifier[0].image;

        if (methodName === "setup")
        {
            context.insideSetup = true; // add more context: inside setup()
            context.preload = "";
        }
    }

    return true;
}

function extractCodeVisitor_blockStatement(node, level, options, context, result)
{
    if (context.insideSetup === true)
    {
        let temp = {code:""};
        visitChildren(node, level+1, extractCodeVisitor, options, context, temp);

        if (context.isLoadFile === true)
        {
            // hack for font string transformation:
            //      courier = createFont("Courier", 24); ->
            //      courier = "Courier"; 

            let regex_isLoadFont = /loadFont/;
            let regex_isFilename = /\".+\.[a-z]{3}\"/i;

            let matchesLoadFont = temp.code.match(regex_isLoadFont);
            let matchesFilename = temp.code.match(regex_isFilename);

            if (matchesLoadFont && !matchesFilename)
            {

                temp.code = temp.code.replace(/loadFont.*\(/, "");
                temp.code = temp.code.replace(")", "");
            }

            // save load*() statements to put in preload()

            context.preload += temp.code;
            context.isLoadFile = false;
        }
        else
        {
            // default: leave statement in setup()

            result.code += temp.code;
        }

        return false;
    }

    return true;
}


const extractCodeVisitor_specialHandlers = {
    fqnOrRefType: extractCodeVisitor_fqnOrRefType,
    argumentList: extractCodeVisitor_argumentList,
    variableDeclaratorList: extractCodeVisitor_variableDeclaratorList,
    result: extractCodeVisitor_result,
    binaryExpression: extractCodeVisitor_binaryExpression,
    basicForStatement: extractCodeVisitor_basicForStatement,
    ifStatement: extractCodeVisitor_ifStatement,
    enhancedForStatement: extractCodeVisitor_enhancedForStatement,
    fieldDeclaration: extractCodeVisitor_fieldDeclaration,
    unannType: extractCodeVisitor_unannType,
    variableDeclarator: extractCodeVisitor_variableDeclarator,
    classDeclaration: extractCodeVisitor_classDeclaration,
    constructorDeclarator: extractCodeVisitor_constructorDeclarator,
    methodBody: extractCodeVisitor_methodBody,
    constructorBody: extractCodeVisitor_methodBody, // same as methodBody
    simpleTypeName: extractCodeVisitor_simpleTypeName,
    newExpression: extractCodeVisitor_newExpression,
    methodDeclaration: extractCodeVisitor_methodDeclaration,
    methodDeclarator: extractCodeVisitor_methodDeclarator,
    blockStatement: extractCodeVisitor_blockStatement,
}

function extractCodeVisitor(node, level, options, context, result)
{ 
    if ("image" in node)
        return extractCodeVisitor_image(node, level, options, context, result);

    if ("name" in node && node.name in extractCodeVisitor_specialHandlers)
        return extractCodeVisitor_specialHandlers[node.name](node, level, options, context, result);

    return true;
}

// helper functions

function getClassBody(node, level, options, context, data) {
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
    visitNodesRecursive(cst, 0, getClassBody, null, null, classBody);
    return classBody.node;
}


// main entry function to visit cst

function cstExtractCode(cst, options)
{
    let root = cst;
    let context = {};
    let result = {code: ""};

    if (options.ignoreOuterClass) 
        root = getClassBodyNode(cst);

    visitNodesRecursive(root, 0, extractCodeVisitor, 
            options, {...context, noHeader:true}, result);

    if (options.ignoreOuterClass) 
        result.code = result.code.trim().slice(1,-1); // remove braces

    let output = beautify(result.code);

    if (options.transform === true && 
        !context.noHeader && 
        result.arrayListReference === true)
        output = arrayListDeclaration + output;

    return output;
}


function cstPrintOutlineVisitor(node, level, options, context, result) {

    if (!("name" in node)) return true;

    if (node.name === "fieldDeclaration")
    {
        const tempOptions = {
            transform: false,
            ignoreOuterClass: false
        };

        let code = cstExtractCode(node, tempOptions);

        console.log(code);

        return false;
    }

    return true;
}


const cstPrintOutline = cst => visitNodesRecursive(cst, 0, cstPrintOutlineVisitor, null, null, null);


function printOutlineProcessing(code)
{
    const wrapped = "public class Dummy {" + code + "}";
    const cst = parse(wrapped);
    cstPrintOutline(cst);
}


const arrayListDeclaration = `
class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}

`;


function preprocessProcessing(code)
{
    let wrapped = "public class Dummy {" + code + "}";
   
    // hack: Processing allows int/color literals of the form #ff1234 (6 digits
    // exactly), but Processing literals are not valid Java, and java-parser
    // chokes on them.  Also, p5.js uses strings.  So we quote all Processing
    // color literals before parsing.

    const regex_hex = /#[0-9A-Fa-f]{6}/g;
    wrapped = wrapped.replace(regex_hex, '"$&"');

    // comment out import statements
    
    const regex_import = /import/g;
    wrapped = wrapped.replace(regex_import, '//$&');

    // hack: add missing Processing loadSound()
    // note: this is a quick-and-dirty fix, with the side-effect that the
    // loadSound() call is moved to preload(); this fix will not work on 
    // multi-line statements involving "new SoundFile()"

    const regex_soundFile = /new.*SoundFile.*,/g;
    wrapped = wrapped.replace(regex_soundFile, 'loadSound(');

    return wrapped;
}


function unpreprocessProcessing(code)
{
    // undo the regex transformations (but not the outer Dummy class (for now?))

    // we quote Processing color literals in preprocessProcessing, so
    // we need to un-quote for round-trip back to valid Processing code

    const regex_quoted_hex = /\"#[0-9A-Fa-f]{6}\"/g;
    code = code.replace(regex_quoted_hex, s => s.substring(1, s.length-1));

    // expand loadSound(), add import if necessary

    const regex_soundFile = /loadSound\(/;
    let matches = code.match(regex_soundFile);
    if (matches)
    {
        code = code.replace(regex_soundFile, 'new SoundFile(this, ');
        code = "import processing.sound.*;\n" + code;
    }

    return code;
}


function transformProcessing(code)
{
    const preprocessed = preprocessProcessing(code);
    const cst = parse(preprocessed);

    const options = {
        transform: true,
        ignoreOuterClass: true
    };

    return cstExtractCode(cst, options);
}


function reconstructProcessing(code)
{
    const preprocessed = preprocessProcessing(code);
    const cst = parse(preprocessed);

    const options = {
        transform: false,
        ignoreOuterClass: true
    };

    let output = cstExtractCode(cst, options);
    
    return unpreprocessProcessing(output);
}


if (typeof(module) !== 'undefined')
{
    module.exports = 
    { 
        printRawProcessing,
        printOutlineProcessing,
        transformProcessing,
        reconstructProcessing,
    };

    console.log("processing-p5js-convert");
}


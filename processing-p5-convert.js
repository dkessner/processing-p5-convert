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

function handle_fqnOrRefType(node, level, options, context, data) {

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
        console.log("[processing-p5-convert] handle_fqnOrRefType not ok");
        return;
    }

    // extract the first part

    let temp = {code:""};
    visitNodesRecursive(node.children.fqnOrRefTypePartFirst["0"], level+1, extractCodeVisitor, options, context, temp);

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
            visitNodesRecursive(dotArray[index], level+1, extractCodeVisitor, options, context, temp);
            visitNodesRecursive(restArray[index], level+1, extractCodeVisitor, options, context, temp);
        }
    }

    // save extracted code

    data.code += temp.code;
}

function handle_variableDeclaratorList(node, level, options, context, data) {
    //
    // variableDeclaratorList stores arguments and commas in separate arrays
    //
    // float mouseX, mouseY;
    //  Comma: [\,]
    //  variableDeclarator: [mouseX, mouseY]
    //

    // sanity check

    const ok = "variableDeclarator" in node.children && "Comma" in node.children;

    if (!ok)
    {
        console.log("[processing-p5-convert] handle_variableDeclaratorList not ok");
        return;
    }

    // extract code

    const variableDeclaratorArray = node.children.variableDeclarator;
    const commaArray = "Comma" in node.children ? node.children.Comma : null;

    let temp = {code:""};

    for (const index in variableDeclaratorArray)
    {
        visitNodesRecursive(variableDeclaratorArray[index], level+1, extractCodeVisitor, options, context, temp);
        if (commaArray !== null && index in commaArray)
            visitNodesRecursive(commaArray[index], level+1, extractCodeVisitor, options, context, temp);
    }

    // save extracted code

    data.code += temp.code;
}

function handle_argumentList(node, level, options, context, data) {
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
        console.log("[processing-p5-convert] handle_argumentList not ok");
        return;
    }

    // extract the first part

    const expressionArray = node.children.expression;
    const commaArray = "Comma" in node.children ? node.children.Comma : null;

    let temp = {code:""};

    for (const index in expressionArray)
    {
        visitNodesRecursive(expressionArray[index], level+1, extractCodeVisitor, options, context, temp);

        if (options.transform === true && context.isCreateFont === true)
        {   
            // transform: createFont -> loadFont
            context.isCreateFont = false;
            break;  // retain first argument only 
        }

        if (commaArray !== null && index in commaArray)
            visitNodesRecursive(commaArray[index], level+1, extractCodeVisitor, options, context, temp);
    }

    // save extracted code

    data.code += temp.code;
}

function handle_binaryOperator(node, level, options, context, data) {
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
        console.log("[processing-p5-convert] handle_binaryOperator not ok");
        return;
    }

    const binaryOperatorArray = node.children.BinaryOperator;
    const unaryExpressionArray = node.children.unaryExpression;

    let temp = {code:""};

    for (const index in binaryOperatorArray)
    {
        visitNodesRecursive(unaryExpressionArray[index], level+1, extractCodeVisitor, options, context, temp);
        visitNodesRecursive(binaryOperatorArray[index], level+1, extractCodeVisitor, options, context, temp);
    }
    visitNodesRecursive(unaryExpressionArray[unaryExpressionArray.length-1], level+1, extractCodeVisitor, options, context, temp);

    data.code += temp.code;
}


function handle_basicForStatement(node, level, options, context, data) {

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
}

function handle_ifStatement(node, level, options, context, data) {

    const ok = "If" in node.children &&
               "Else" in node.children &&
               "LBrace" in node.children &&
               "RBrace" in node.children &&
               "expression" in node.children &&
               "statement" in node.children && node.children.statement.length === 2;

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
    visitNodesRecursive(node.children.Else[0], level+1, extractCodeVisitor, options, context, data);
    visitNodesRecursive(node.children.statement[1], level+1, extractCodeVisitor, options, context, data);
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

function extractCodeVisitor(node, level, options, context, result)
{
    if ("image" in node) // actual code is stored as node["image"]
    {
        if (options.transform === true)
        {
            // transform:  member variables in class method body x -> this.x

            if (context.methodBody === true && 
                "memberVariables" in context && 
                context.memberVariables.includes(node.image))
            {
                result.code += "this." + node.image + " ";
                return true;
            }

            // transform: for each loop : -> of

            if (context.enhancedForStatement === true)
            {
                if (node.image === ":")
                {
                    result.code += "of ";  
                    return true;
                }
            }
        }

        result.code += node.image + " ";
        return true;
    }

    if (!("name" in node)) return true;

    if (node.name === "fqnOrRefType")
    {
        let temp = {code:""};
        handle_fqnOrRefType(node, level, options, context, temp);

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
                temp.code = "loadFont "; // transform println -> console.log
                context.isLoadFile = true; 
                context.isCreateFont = true;
            }
        }

        result.code += temp.code;
        return false; // treat special nodes as terminal
    }
    else if (node.name === "argumentList")
    {
        handle_argumentList(node, level, options, context, result);
        return false;
    }
    else if (node.name === "variableDeclaratorList")
    {
        if ("Comma" in node.children)
        {
            handle_variableDeclaratorList(node, level, options, context, result);
            return false;
        }
        else
            return true;
    }
    else if (node.name === "result")
    {
        // transform function result type depending on context
        // - global:  void/int/... -> function
        // - class: void/int/... -> ""

        if (options.transform === true) {
            if (context.classDeclaration !== true) {
                result.code +=  "function "; 
            }
            return false;
        }
    }
    else if (node.name === "binaryExpression" && "BinaryOperator" in node.children)
    {
        handle_binaryOperator(node, level, options, context, result);
        return false;
    }
    else if (node.name === "basicForStatement")
    {
        handle_basicForStatement(node, level, options, context, result);
        return false;
    }
    else if (node.name === "ifStatement")
    {
        if ("Else" in node.children)
        {
            handle_ifStatement(node, level, options, context, result);
            return false;
        }
        return true;
    }
    else if (node.name === "enhancedForStatement")
    {
        visitChildren(node, level+1, extractCodeVisitor, 
            options, {...context, enhancedForStatement:true}, result);
        return false;
    }
    else if (node.name === "fieldDeclaration")
    {
        visitChildren(node, level+1, extractCodeVisitor, 
                options, {...context, fieldDeclaration:true}, result);

        if (options.transform === true)
            registerField(node, context, result);

        return false;
    }
    else if (node.name === "unannType" && options.transform) // inside "fieldDeclaration"
    {
        // transform field declarations depending on context:
        // - global: int/float/... -> let
        // - class:  int/float/... -> ""

        if (context.classDeclaration !== true)
            result.code += "let ";

        return false;
    }
    else if (node.name === "variableDeclarator")
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
    else if (node.name === "classDeclaration")
    {
        let newContext = {
            ...context, 
            classDeclaration: true,
            memberVariables: []
        };

        visitChildren(node, level+1, extractCodeVisitor, options, newContext, result);
        return false;
    }
    else if (node.name === "constructorDeclarator")
    {
        visitChildren(node, level+1, extractCodeVisitor, 
            options, {...context, constructorDeclarator:true}, result);
        return false;
    }
    else if (context.classDeclaration === true && 
            (node.name === "constructorBody" || 
             node.name === "methodBody"))
    {
        visitChildren(node, level+1, extractCodeVisitor, 
            options, {...context, methodBody:true}, result);
        return false;
    }
    else if (node.name === "simpleTypeName" && 
        context.constructorDeclarator === true &&
        options.transform)
    {
        result.code += "constructor"; // transform: ClassName() -> constructor()
        return false;
    }
    else if (node.name === "newExpression" && options.transform === true)
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

        return true;
    }
    else if (node.name === "methodDeclaration")
    {
        let newContext = {...context, methodDeclaration: true};

        visitChildren(node, level+1, extractCodeVisitor, 
            options, newContext, result);

        if (newContext.insideSetup === true && newContext.preload)
        {
            result.code += "function preload() {" + newContext.preload + "}";
        }

        return false;
    }
    else if (node.name === "methodDeclarator")
    {
        if (context.classDeclaration !== true && context.methodDeclaration === true)
        {
            const methodName = node.children.Identifier[0].image;

            if (methodName === "setup")
            {
                context.insideSetup = true; // add more context: inside setup()
                context.preload = "";
            }

            return true;
        }
    }
    else if (node.name === "blockStatement")
    {
        if (context.insideSetup === true)
        {
            let temp = {code:""};
            visitChildren(node, level+1, extractCodeVisitor, options, context, temp);

            if (context.isLoadFile === true)
            {
                context.preload += temp.code;
                context.isLoadFile = false;
            }
            else
            {
                result.code += temp.code;
            }

            return false;
        }
    }

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


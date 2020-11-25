//
// explore.js
//


/*
const { 
    parse, 
    BaseJavaCstVisitor, 
    BaseJavaCstVisitorWithDefaults } = require("java-parser");
*/ 


import { 
    parse, 
    BaseJavaCstVisitor, 
    BaseJavaCstVisitorWithDefaults } from 'java-parser';


const javaText = `
public class HelloWorldExample{
  public static void main(String args[]){
    System.out.println("Hello World !");
    ArrayList<Integer> numbers = new ArrayList<Integer>();
    numbers.add(5);
    numbers.add(9);
    numbers.add(8);
    numbers.add(1);
    numbers.forEach( n -> { System.out.println(n); } );
  }
}
`;

const cst = parse(javaText);

console.log(cst);

// explore the CST

// Use "BaseJavaCstVisitor" if you need to implement all the visitor methods yourself.
class LambdaArrowsPositionCollector extends BaseJavaCstVisitorWithDefaults {
  constructor() {
    super();
    this.customResult = [];
    this.validateVisitor();
  }

  lambdaExpression(ctx) {

    console.log(ctx);
    // Collects all the starting offsets of lambda arrows in lambdas with short (no parenthesis)
    // single argument lists: e.g:
    // - n -> n*n (will be collected)
    // - (n) -> n*n (not collected)
    if (ctx.lambdaParameters[0].children.Identifier) {
      this.customResult.push(ctx.Arrow[0].startOffset);
    }
  }

  methodHeader(ctx) {
    console.log("***:");
    console.log(ctx);
    console.log(ctx.result[0].children);
    console.log(ctx.methodDeclarator[0]);
    console.log("***:");
  }


  statement(ctx) {
    console.log("statement()");
  }
}

const lambdaArrowsCollector = new LambdaArrowsPositionCollector();
// The CST result from the previous code snippet
lambdaArrowsCollector.visit(cst);

console.log(BaseJavaCstVisitorWithDefaults);

console.log(lambdaArrowsCollector);
console.log("Hello, world!");

lambdaArrowsCollector.customResult.forEach(arrowOffset => {
  console.log(arrowOffset);
});



console.log("######");


let text = "";

let dummy = { 
    hello: "hello",
    image: "is everything",
    foo: 5,
    child: {
        hello: "hello2",
        bar: 5,
        image: "child image",
    },
    child2: null
};


function printStuff(stuff)
{
    for (const thing in stuff)
    {
        if (thing === "image")
        {
            text = text + stuff[thing] + " ";
            if (stuff[thing] == "System")
                console.log("System");
        }
        else if (typeof stuff[thing] === "object")
        {
            printStuff(stuff[thing]);
        }
    }
}


printStuff(cst);

console.log(text);




//
// test.js
//


import { 
    printCST, 
    reconstructJava, 
    transformJava, 
    transformProcessing
} from './processing-p5-convert.js';


const javaCode = 
`
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

const processingJavaCode = 
`
public class Hello {
void setup()
{
    size(400, 400);
}

void draw()
{
    ellipse(200, 200, 100, 100);
}
}
`;

const processingCode = 
`
void setup()
{
    size(400, 400);
}

void draw()
{
    ellipse(200, 200, 100, 100);
}
`;


function test()
{
    console.log("Java:\n" + javaCode);
    console.log("reconstructed code:\n" + reconstructJava(javaCode));

    console.log("Processing-Java:\n" + processingJavaCode);
    console.log("reconstructed code:\n" + reconstructJava(processingJavaCode));
    console.log("\ntransformed code:\n" + transformJava(processingJavaCode));

    console.log("Processing:\n" + processingCode);
    console.log("\ntransformed code:\n" + transformProcessing(processingCode));
}


test()



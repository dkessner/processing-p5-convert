//
// processing-p5-convert-bootstrap.js
//


let code;


function preload()
{
    let filename = document.getElementById("ppconvert").getAttribute("src");
    code = loadStrings(filename);
}


function setup()
{
    code = code.join('\n');
    console.log(code);

    const codeOutput = ppconvert.transformProcessing(code);
    console.log(codeOutput); 

    // run the p5.js code
    // Note: this will redefine setup() (the function we're in)

    window.eval(codeOutput); 
    document.getElementById("defaultCanvas0").remove();
    new p5();
}


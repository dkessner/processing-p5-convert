//
// index.js
//


import {transformProcessing} from './processing-p5-convert.js';


const helloProcessing =
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


function handleConvertButton()
{
    const codeInput = document.getElementById("processing-p5-convert-input").value;
    const codeOutput = transformProcessing(codeInput);

    document.getElementById("processing-p5-convert-output").value = codeOutput;
        
    // TODO: restart p5 loop

    /*
    let f = new Function(codeOutput);
    f();
    */


    // window.eval() works
    /*
    window.eval(codeOutput);
    setup();
    */
}


function initialize()
{
    document.getElementById("processing-p5-convert-input").value = helloProcessing;

    document.getElementById("processing-p5-convert-button").
        addEventListener("click", handleConvertButton);
}


initialize();



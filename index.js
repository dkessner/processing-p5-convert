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


function handleConvert()
{
    let codeInput = document.getElementById("processing-p5-convert-input").value;

    document.getElementById("processing-p5-convert-output").value = 
        transformProcessing(codeInput);
}


function initialize()
{
    document.getElementById("processing-p5-convert-input").value = helloProcessing;

    document.getElementById("processing-p5-convert-button").
        addEventListener("click", handleConvert);
}


initialize();



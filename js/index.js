//
// index.js
//


//
// Note: we're using browserify with the option
//   --standalone ppconvert
// which exposes exports like:
//   ppconvert.transformProcessing
//


const helloProcessing =
`
void setup()
{
    size(400, 400);
}

void draw()
{
    background(0);
    ellipse(200, 200, 100, 100);
}
`;


function handleConvertButton()
{
    // convert Processing code

    const codeInput = inputCodeMirrorEditor.getValue();
    const codeOutput = ppconvert.transformProcessing(codeInput);
    outputCodeMirrorEditor.setValue(codeOutput);

    // run the p5.js code

    // p5.js does some magic to make sure preload() completes
    //
    // This seems to work: 
    //  - remove existing p5 canvas
    //  - call "new p5();"
    //  - run user p5.js sketch

    let canvas = document.getElementById("defaultCanvas0");
    if (canvas) canvas.remove();

    new p5();

    window.eval(codeOutput);
}


function initialize()
{
    document.getElementById("processing-p5-convert-input").value = helloProcessing;

    document.getElementById("processing-p5-convert-button").
        addEventListener("click", handleConvertButton);
}


initialize();



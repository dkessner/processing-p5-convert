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
    //const codeInput = document.getElementById("processing-p5-convert-input").value;
    //document.getElementById("processing-p5-convert-output").value = codeOutput;

    // convert Processing code

    const codeInput = inputCodeMirrorEditor.getValue();
    const codeOutput = ppconvert.transformProcessing(codeInput);
    outputCodeMirrorEditor.setValue(codeOutput);

    // run the p5.js code

    window.eval(codeOutput);
    preload();
    setup();
}


function initialize()
{
    document.getElementById("processing-p5-convert-input").value = helloProcessing;

    document.getElementById("processing-p5-convert-button").
        addEventListener("click", handleConvertButton);
}


initialize();



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

    window.eval(codeOutput);

    // p5.js does some magic to make sure preload() completes -- this
    // doesn't quite work:
    //
    // if (typeof preload === 'function') preload();
    // setup();

    // This seems to work better: 
    //  - remove existing p5 canvas
    //  - (re)define preload/setup/draw
    //  - call "new p5();"

    let canvas = document.getElementById("defaultCanvas0");
    if (canvas) canvas.remove();

    new p5();
}


function initialize()
{
    document.getElementById("processing-p5-convert-input").value = helloProcessing;

    document.getElementById("processing-p5-convert-button").
        addEventListener("click", handleConvertButton);
}


initialize();



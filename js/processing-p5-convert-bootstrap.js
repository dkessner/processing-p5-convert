//
// processing-p5-convert-bootstrap.js
//


let codeArrays = [];


function preload()
{
    let filenames = document.getElementById("ppconvert").getAttribute("src").split(/[\ \n\t]+/);

    console.log("[processing-p5-convert-bootstrap] Reading .pde files:");

    for (let filename of filenames)
    {
        console.log(" " + filename);
        let temp =  loadStrings(filename);
        codeArrays.push(temp);
    }
}


function setup()
{
    const mergedArrays = [].concat.apply([], codeArrays);
    
    const code = mergedArrays.join('\n');
    console.log(code);

    const codeOutput = ppconvert.transformProcessing(code);
    console.log(codeOutput); 

    // run the p5.js code
    // Note: this will redefine setup() (the function we're in)

    window.eval(codeOutput); 
    document.getElementById("defaultCanvas0").remove();
    new p5();
}


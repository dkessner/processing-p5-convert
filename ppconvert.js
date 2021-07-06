//
// ppconvert.js
//


import { 
    printRawProcessingFile, 
    printOutlineProcessingFile, 
    transformProcessingFile, 
    reconstructProcessingFile } 
from './processing-p5-convert.js';


let reconstruct = false;
let raw = false;
let outline = false;


function main()
{
    let args = process.argv.slice(2);

    // handle command line

    for (let i=0; i<args.length; i++)
    {
        let option = args[i];

        if (option.startsWith('--'))
        {
            if (option === '--reconstruct')
                reconstruct = true;
            else if (option === '--raw')
                raw = true;
            else if (option === '--outline')
                outline = true;
        }
        else 
        {
            args.splice(0, i);
            break;
        }
    }

    // convert files

    for (const filename of args)
    {
        let code;

        if (reconstruct === true) {
            code = reconstructProcessingFile(filename);
        }
        else if (raw === true) {
            code = printRawProcessingFile(filename);
        }
        else if (outline === true) {
            code = printOutlineProcessingFile(filename);
        }
        else {
            code = transformProcessingFile(filename);
        }

        if (code) console.log(code);
    }
}


main();



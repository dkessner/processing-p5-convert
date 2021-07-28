#!/usr/bin/env node

//
// ppconvert.js
//


import { 
    printRawProcessing, 
    printOutlineProcessing, 
    transformProcessing, 
    reconstructProcessing} 
from './processing-p5-convert.js';

import { readFileSync } from 'fs';

let reconstruct = false;
let raw = false;
let outline = false;


function main()
{
    let args = process.argv.slice(2);

    if (args.length === 0)
    {
        console.log("Usage: ppconvert [option] filename1.pde [...]");
        console.log("Options:");
        console.log("  --reconstruct: print reconstructed Processing code");
        console.log("  --raw: print syntax tree");
        console.log("  --outline: print outline");
        return;
    }

    let switches = args.filter(option => option.startsWith('--'));
    let filenames = args.filter(option => !option.startsWith('--'));

    for (const option of switches)
    {
        if (option === '--reconstruct')
            reconstruct = true;
        else if (option === '--raw')
            raw = true;
        else if (option === '--outline')
            outline = true;
        else 
            console.log("[ppconvert] Ignoring unkown option " + option);
    }

    let inputCode = "";

    for (const filename of filenames)
    {
        try 
        {
            const temp = readFileSync(filename, 'utf8')
            inputCode += temp;
        } 
        catch (err) 
        {
            console.error("[ppconvert] " + err.message)
            return;
        }
    }

    let outputCode;

    if (reconstruct === true) {
        outputCode = reconstructProcessing(inputCode);
    }
    else if (raw === true) {
        outputCode = printRawProcessing(inputCode);
    }
    else if (outline === true) {
        outputCode = printOutlineProcessing(inputCode);
    }
    else {
        outputCode = transformProcessing(inputCode);
    }

    if (outputCode) console.log(outputCode);
}


main();



#!/usr/bin/env node

//
//  ppconvert.js
//  Copyright (C) 2021 Darren Kessner
//
//  This library is free software; you can redistribute it and/or
//  modify it under the terms of the GNU Lesser General Public
//  License as published by the Free Software Foundation; either
//  version 2.1 of the License, or (at your option) any later version.
//
//  This library is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  Lesser General Public License for more details.
//
//  You should have received a copy of the GNU Lesser General Public
//  License along with this library; if not, write to the Free Software
//  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
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



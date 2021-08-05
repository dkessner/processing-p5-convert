//
//  processing-p5-convert-bootstrap.js
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


// This is a p5.js sketch that does the following:
// - preload(): load .pde files
// - setup(): convert Processing sketch code to p5.js and run


let codeArrays = [];


function preload()
{
    try
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
    catch(e)
    {
        console.log("[processing-p5-convert-bootstrap] Caught error in preload()"); 
    }
}


function setup()
{
    const mergedArrays = [].concat.apply([], codeArrays);
    
    const code = mergedArrays.join('\n');
    console.log(code);

    const codeOutput = ppconvert.transformProcessing(code);
    console.log(codeOutput); 

    if (codeOutput)
    {
        // run the p5.js code
        // Note: this will redefine setup() (the function we're in)

        window.eval(codeOutput); 
        document.getElementById("defaultCanvas0").remove();
        new p5();
    }
}


//
//  index.js
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
    //  - run user p5.js sketch
    //  - call "new p5();"

    let canvas = document.getElementById("defaultCanvas0");
    if (canvas) canvas.remove();

    window.eval(codeOutput);

    new p5();
}


function initialize()
{
    document.getElementById("processing-p5-convert-input").value = helloProcessing;

    document.getElementById("processing-p5-convert-button").
        addEventListener("click", handleConvertButton);
}


initialize();



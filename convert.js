//
// convert.js
//


import { transformProcessingFile } from './processing-p5-convert.js';


function main()
{
    const args = process.argv.slice(2);

    for (const filename of args)
    {
        const code = transformProcessingFile(filename);
        if (code) console.log(code);
    }
}


main();



---
layout: default
---

# Command line usage

## Installation

Clone the repository:
```
git clone git@github.com:dkessner/processing-p5-convert.git
```

Change to the project directory and install the `ppconvert`
command line tool.
```
cd processing-p5-convert
make install-cli
```

Type `ppconvert` with no arguments for usage:
```
Usage: ppconvert [option] filename1.pde [filename2.pde ...]
Options:
  [none]       : output converted p5.js code
  --reconstruct: output reconstructed Processing code
  --raw        : output syntax tree
  --outline    : output outline
```


Try it out on `hello/hello.pde`:
```
ppconvert hello/hello.pde
```

Output:
```
//
// hello
//
function setup() {
    createCanvas(400, 400);
}
function draw() {
    background(0);
    fill("#00ff00"); // Processing color literal
    ellipse(200, 200, 100, 100);
}
```


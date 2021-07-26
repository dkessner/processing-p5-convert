---
---

# About processing-p5-convert

processing-p5-convert is a Javascript library and command line tool
that converts [Processing](http://processing.org) source code (Java) to 
[p5.js](http://p5js.org) source code (Javascript).

Source code translation is implemented by parsing the Processing/Java code
into a Concrete Syntax Tree (CST) using the
[java-parser](https://github.com/jhipster/prettier-java/tree/master/packages/java-parser)
library.  The CST retains all code symbols, which facilitates reconstruction
of the source code.  processing-p5-convert walks the CST, performing
transformations as it reconstructs the source code.  

Most of the basic syntax (braces, function calls, conditionals, loops) is
identical between Java and Javascript.  Some source code transformations
handle language differences (e.g. declaration of variables, functions, and
classes, for-each vs. for-of loops, Java ArrayList vs. Javascript array).
Other source code transformations handle specific differences between the
Processing and p5.js APIs.

[Live Demo](https://dkessner.github.io/processing-p5-convert/)

## Why?

I use Processing to [teach computer science](https://dkessner.github.io/).
To run Processing sketches on web pages, I previously used the
[processing.js](https://github.com/processing-js/processing-js) project,
which has now been retired.



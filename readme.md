---
---

# About processing-p5-convert

### [Live Demo](https://dkessner.github.io/processing-p5-convert/)

processing-p5-convert is a source code translator that that converts
Processing/Java code to p5.js/Javascript code.  It includes a command line
tool, and can also be used in the browser to convert and run Processing
sketches.

Source code translation is implemented by parsing the Processing/Java code
into a syntax tree.  The syntax tree retains all code symbols, which
facilitates reconstruction of the source code.  processing-p5-convert walks
the syntax tree, performing transformations as it reconstructs the source
code.  

Most of the basic syntax (braces, function calls, conditionals, loops) is
identical between Java and Javascript.  Some source code transformations
handle language differences (e.g. declaration of variables, functions, and
classes, for-each vs. for-of loops, Java ArrayList vs. Javascript array).
Other source code transformations handle specific differences between the
Processing and p5.js APIs.

## Issues

Please [report any issues](https://github.com/dkessner/processing-p5-convert/issues)
that you find!


## Why?

I use Processing to [teach computer science](https://dkessner.github.io/).
To run Processing sketches on web pages, I previously used the
[processing.js](https://github.com/processing-js/processing-js) project,
which has now been retired.

## Links

[Processing](https://processing.org/)  

[p5.js](https://p5js.org/)  

This project relies heavily on both sub-projects of the 
[Prettier Java](https://github.com/jhipster/prettier-java/tree/main)
project:
- [java-parser](https://github.com/jhipster/prettier-java/tree/master/packages/java-parser):
for parsing of the Processing/Java code into a Concrete Syntax Tree (CST).
- [prettier-java-plugin](https://github.com/jhipster/prettier-java/tree/main/packages/prettier-plugin-java):
for code formatting after extraction from the tree (both Javascript and Java)



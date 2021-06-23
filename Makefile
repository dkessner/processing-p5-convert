#
# Makefile
#


all: processing-p5-convert-bundle.js tests 

processing-p5-convert-bundle.js: index.js processing-p5-convert.js
	browserify index.js processing-p5-convert.js -o processing-p5-convert-bundle.js

tests: hello.test variables.test

%.test:
	node ppconvert $*/*.pde | diff - $*/$*.js

clean:
	rm -f processing-p5-convert-bundle.js*

.PHONY: %.test test clean


# $* stem of implicit rule match 
# $@ target 
# $< first prerequisite


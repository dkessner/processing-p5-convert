#
# Makefile
#


all: bundle.js tests 

bundle.js: index.js processing-p5-convert.js
	browserify index.js processing-p5-convert.js -o bundle.js

tests: hello.test variables.test

%.test:
	node ppconvert $*/*.pde | diff - $*/$*.js

clean:
	rm -f bundle.js*

.PHONY: %.test test clean


# $* stem of implicit rule match 
# $@ target 
# $< first prerequisite


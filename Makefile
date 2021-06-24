#
# Makefile
#


all: processing-p5-convert-bundle.js tests 

processing-p5-convert-bundle.js: processing-p5-convert.js
	browserify processing-p5-convert.js --standalone ppconvert -o processing-p5-convert-bundle.js

tests: hello.test variables.test variables.langtest

%.test:
	node ppconvert $*/*.pde | diff - $*/$*.js

%.langtest:
	node ppconvert --reconstruct $*/*.pde | diff - $*/$*.reconstruct

clean:
	rm -f processing-p5-convert-bundle.js*

.PHONY: tests %.test %.langtest clean


# $* stem of implicit rule match 
# $@ target 
# $< first prerequisite


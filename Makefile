#
# Makefile
#


all: processing-p5-convert-bundle.js tests 

processing-p5-convert-bundle.js: processing-p5-convert.js
	browserify processing-p5-convert.js --standalone ppconvert -o processing-p5-convert-bundle.js

tests: \
    hello.test hello.langtest \
    bounce.test bounce.langtest \
    grid.test grid.langtest

%.test:
	node ppconvert $*/*.pde | diff - $*/$*.js

%.langtest:
	node ppconvert --reconstruct $*/*.pde | diff - $*/$*.reconstruct

serve:
	bundle exec jekyll serve --baseurl=''

update:
	npm update
	bundle update

install:
	npm install
	bundle install

clean:
	rm -f processing-p5-convert-bundle.js*

.PHONY: tests %.test %.langtest clean


# $* stem of implicit rule match 
# $@ target 
# $< first prerequisite


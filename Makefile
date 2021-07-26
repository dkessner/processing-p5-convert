#
# Makefile
#


all: processing-p5-convert-bundle.js tests minimal

processing-p5-convert-bundle.js: processing-p5-convert.js
	browserify processing-p5-convert.js --standalone ppconvert -o processing-p5-convert-bundle.js

tests: \
    hello.test hello.langtest \
    bounce.test bounce.langtest \
    grid.test grid.langtest \
    bounce_with_class.test bounce_with_class.langtest \
    cat.test cat.langtest \
    hello_font.test hello_font.langtest \
    hello_sound.test hello_sound.langtest

minimal: processing-p5-convert-bundle.js processing-p5-convert-bootstrap.js
	cp processing-p5-convert-bundle.js minimal
	cp processing-p5-convert-bootstrap.js minimal
	cp p5/p5.min.js minimal

%.test:
	node ppconvert $*/*.pde | diff - $*/$*.js

%.langtest:
	node ppconvert --reconstruct $*/*.pde | diff - $*/$*.reconstruct
	node ppconvert  $*/$*.reconstruct | diff - $*/$*.js

serve:
	bundle exec jekyll serve --baseurl=''

update:
	npm update
	bundle update

install:
	npm install
	bundle install

install-cli:
	npm install -g .

uninstall-cli:
	npm uninstall -g ppconvert processing-p5-convert

clean:
	rm -f processing-p5-convert-bundle.js*

.PHONY: tests %.test %.langtest serve update install install-cli uninstall-cli clean minimal


# $* stem of implicit rule match 
# $@ target 
# $< first prerequisite


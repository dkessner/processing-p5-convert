#
# Makefile
#


all: js/processing-p5-convert-bundle.js tests minimal

js/processing-p5-convert-bundle.js: js/processing-p5-convert.js
	browserify js/processing-p5-convert.js --standalone ppconvert -o js/processing-p5-convert-bundle.js

tests: \
    hello.test hello.langtest \
    bounce.test bounce.langtest \
    grid.test grid.langtest \
    bounce_with_class.test bounce_with_class.langtest \
    cat.test cat.langtest \
    hello_font.test hello_font.langtest \
    hello_sound.test hello_sound.langtest \
    explode.test explode.langtest

minimal: js/processing-p5-convert-bundle.js js/processing-p5-convert-bootstrap.js
	cp js/processing-p5-convert-bundle.js minimal
	cp js/processing-p5-convert-bootstrap.js minimal
	cp p5/p5.min.js minimal

%.test:
	node js/ppconvert $*/*.pde | diff - $*/$*.js

%.langtest:
	node js/ppconvert --reconstruct $*/*.pde | diff - $*/$*.reconstruct
	node js/ppconvert  $*/$*.reconstruct | diff - $*/$*.js

serve:
	bundle exec jekyll serve --baseurl=''

install-local:
	npm install
	bundle install

update:
	npm update
	bundle update

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


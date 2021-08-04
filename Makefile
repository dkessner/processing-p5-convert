#
# Makefile
#


all: node_modules js/processing-p5-convert-bundle.js minimal tests 

js/processing-p5-convert-bundle.js: js/processing-p5-convert.js
	browserify js/processing-p5-convert.js --standalone ppconvert -o js/processing-p5-convert-bundle.js

node_modules: package.json
	@echo updating node_modules
	npm install

test.message:
	@echo running tests

tests: test.message \
    hello.test hello.langtest \
    bounce.test bounce.langtest \
    grid.test grid.langtest \
    bounce_with_class.test bounce_with_class.langtest \
    cat.test cat.langtest \
    hello_font.test hello_font.langtest \
    hello_sound.test hello_sound.langtest \
    explode.test explode.langtest \
    bounce_vectors.test bounce_vectors.langtest \
    hello_3d.test hello_3d.langtest
	@echo tests passed
 
minimal: js/processing-p5-convert-bundle.js js/processing-p5-convert-bootstrap.js
	@echo updating minimal example
	@cp js/processing-p5-convert-bundle.js minimal
	@cp js/processing-p5-convert-bootstrap.js minimal
	@cp p5/p5.min.js minimal

zipfilename = processing-p5-convert-minimal.zip

zip: minimal/$(zipfilename)

minimal/$(zipfilename): minimal
	cd minimal && zip $(zipfilename) *

%.test:
	@echo test: $*
	@node js/ppconvert $*/*.pde | diff - $*/$*.js

%.langtest:
	@echo langtest: $*
	@node js/ppconvert --reconstruct $*/*.pde | diff - $*/$*.reconstruct
	@node js/ppconvert  $*/$*.reconstruct | diff - $*/$*.js

serve: node_modules js/processing-p5-convert-bundle.js minimal
	bundle exec jekyll serve --baseurl=''

install-jekyll:
	bundle install

install-cli: all
	npm install -g .

uninstall-cli:
	npm uninstall -g ppconvert processing-p5-convert

clean:
	rm -f js/processing-p5-convert-bundle.js*
	rm -f minimal/$(zipfilename) minimal/*.js
	rm -rf node_modules

.PHONY: test.message tests %.test %.langtest \
	serve update install \
	install-cli uninstall-cli \
	clean zip


# $* stem of implicit rule match 
# $@ target 
# $< first prerequisite


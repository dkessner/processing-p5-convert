
bundle.js: index.js processing-p5-convert.js
	browserify index.js processing-p5-convert.js -o bundle.js

test:
	node test.js

clean:
	rm -f bundle.js*


.PHONY: test clean


#
# Makefile
#

# $* stem of implicit rule match 
# $@ target 
# $< first prerequisite


pdf_targets = $(patsubst %.md,%.pdf,$(wildcard *.md))

html_targets = $(patsubst %.md,%.html,$(wildcard *.md))

targets = $(html_targets) $(pdf_targets)

all: $(targets)
	@echo Targets: $(targets)

# --mathjax: currently uses MathJax CDN for rendering
# -s: standalone (use full HTML template)

%.html: %.md
	pandoc $< -o $@ -t html5 -s --mathjax --default-image-extension=svg


# --default-image-extension (and leave off extension in .md source files) as a workaround
#  for LaTeX not handling .svg natively.
#
# --include-in-header=nocaption.tex
#

%.pdf: %.md
	pandoc $< -o $@ --default-image-extension=pdf


clean:
	rm -f $(targets)



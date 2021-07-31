---
---

# notes

## issues

- fix: v.x -> v.this.x in member function

- fix: argument list , -> ; 

- fix: possible problem with local variable declaration inside methods (dandelin?)

- ternary operator

- comment out multiple constructors

- js beautify doesn't work on Java floating point literals
    - investigate prettier-java 
    - grid.reconstruct does not run, and grid.langtest fails (0 f)  

- on-the-fly conversion with preload() is inconsistent:
    - two button presses works in processing-p5-convert local, but not hosted
    - does not work currently with ProcessingExamples/explode
    - workaround for now for examples with significant preload(): 
        - convert .pde to .js file ahead of time, load js as normal p5 sketch
        - don't do conversion on page load  

- investigate: On-demand global new p5() at top of converted code, to allow
  p5.js functions to be called outside setup()


## pitfalls

- Processing allows the user to override API functions (e.g. ellipse, hue,
  ...).  This causes problems (inconsistenly) with p5.js.  

- p5.js does not permit calling API functions before initialization (e.g.
  sqrt).  Recommendation: put all initialization in setup().

- Classes may have multiple constructors in Java, but not Javascript.  

- p5.js does not reset imageMode(CORNER) at beginning of draw()

- Processing origin is always upper-left corner of window.  p5.js 2D origin is
  upper-left corner, and 3D origin is center of screen.  




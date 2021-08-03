---
---

# notes

## known issues / pitfalls

- Processing origin is always upper-left corner of window.  p5.js 2D origin is
  upper-left corner, and 3D origin is center of screen.  

- Processing resets to imageMode(CORNER) at beginning of draw(); p5.js does
  not.

- Classes may have multiple constructors in Processing/Java, but not
  p5.js/Javascript.  processing-p5-convert comments out all constructor
  declarations after the first.

- Processing allows the user to override API functions (e.g. ellipse, hue,
  ...).  This causes problems (inconsistently) with p5.js.  

- p5.js does not permit calling API functions before initialization (e.g.
  sqrt).  Recommendation: put all initialization in setup().

- on-the-fly conversion with preload() is inconsistent:
    - issue with preloading multiple images (explode example)
    - conversion works on 2nd try?
    - workaround for now for examples with significant preload(): convert .pde
      to .js file ahead of time via command line, load js as normal p5 sketch

## todo

- ternary operator

- Java PApplet handling

- static fields/methods

- investigate: On-demand global new p5() at top of converted code, to allow
  p5.js functions to be called outside setup()



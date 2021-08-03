---
---

# notes

## pitfalls

- Processing allows the user to override API functions (e.g. ellipse, hue,
  ...).  This causes problems (inconsistently) with p5.js.  

- p5.js does not permit calling API functions before initialization (e.g.
  sqrt).  Recommendation: put all initialization in setup().

- Classes may have multiple constructors in Java, but not Javascript.  

- p5.js does not reset imageMode(CORNER) at beginning of draw()

- Processing origin is always upper-left corner of window.  p5.js 2D origin is
  upper-left corner, and 3D origin is center of screen.  

- on-the-fly conversion with preload() is inconsistent:
    - issue with preloading multiple images (explode example)
    - conversion works on 2nd try?
    - workaround for now for examples with significant preload(): 
        - convert .pde to .js file ahead of time via command line, load js as
          normal p5 sketch


## todo

- ternary operator

- investigate: On-demand global new p5() at top of converted code, to allow
  p5.js functions to be called outside setup()



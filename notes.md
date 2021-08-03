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

- p5.js does not permit calling API functions before initialization (e.g.
  sqrt).  Recommendation: put all initialization in setup(), rather than in
  global scope.

- conversion of Processing sketches that load significant resources:
    - processing-p5-convert moves `load*()` calls to `preload()`.  p5.js waits
      until these load calls complete before calling `setup()`.
    - this works for conversion of .pde files to .js on the command line
    - this is inconsistent for loading/conversion of .pde files from webpage
        - sometimes works on 2nd try?  
<br/>  
- Processing allows the user to override API functions (e.g. ellipse, hue,
  ...).  This causes problems (inconsistently) with p5.js.  

## todo

- Java PApplet handling

- static methods (Java only?)

- investigate: On-demand global new p5() at top of converted code, to allow
  p5.js functions to be called outside setup()



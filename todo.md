# todo

## issues

- comment out multiple constructors

- handle 2D arrays
    - a = Array.from({length:5}, ()=>new Array(3))

- on-the-fly conversion with preload() is inconsistent:
    - two button presses works in processing-p5-convert local, but not hosted
    - does not work currently with ProcessingExamples/explode
    - workaround for now for examples with significant preload(): 
        - convert .pde to .js file ahead of time, load js as normal p5 sketch
        - don't do conversion on page load

## pitfalls / things we don't handle

- pitfall: hiding API functions (hue)
    - start "things we don't handle" doc
- pitfall: calling API functions before initialization (sqrt)
    - silently call on-demand global p5() before user code?
    - or add to "things we don't handle" doc
- pitfall: multiple constructors
    - log warning
- inconsistency:
    - p5.js does not reset imageMode(CORNER) at beginning of draw()

# todo

- Object(int a) {this.a = a;} -> constructor(a) {this.a = a;}
    - local variable list
    - this.a -> this.a (idempotent)
    - a -> this.a if (member && !local)
- while, do/while, switch, ...

## pitfalls / things we don't handle

- pitfall: hiding API functions (hue)
    - start "things we don't handle" doc
- pitfall: calling API functions before initialization (sqrt)
    - silently call on-demand global p5() before user code?
    - or add to "things we don't handle" doc
- pitfall: multiple constructors
    - log warning


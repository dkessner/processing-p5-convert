

<script src="../p5/p5.min.js"></script>
<script src="grid.js"></script>

# grid

Transformations:
- `for (int i=0; i<5; i++)` -> `for (let i=0; i<5; i++)` 
- `push/popMatrix()` -> `push/pop()`
- remove casts: `(float) x` -> `x`
- remove field modifiers `private final` -> ``
- array initialization 
    - literals `{1, 2, 3, 4}` -> `[1, 2, 3, 4]`
    - 1D: `int[] values = new int[3]` -> `let values = new Array(3)` 
    - 2D: `int[][] values = new int[3][4]` -> 
      `let values = Array.from(new Array(3), () => new Array(4));` 
    - `for/for-each` loops work as expected with 2D arrays

This example also demonstrates that `while`, `do/while`, `switch` work
unchanged.

<br>

<main></main>

Converted p5.js:
```javascript
{% include_relative grid.js %}```

Original Processing:
```java
{% include_relative grid.pde %}```


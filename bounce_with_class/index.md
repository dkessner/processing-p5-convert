

<script src="../p5/p5.min.js"></script>
<script src="bounce_with_class.js"></script>

# bounce with class

Transformations:
- class
    - member field declarations: `int x;` -> `x;`
    - `ClassName()` -> `constructor()`
    - `int methodName()` -> `methodName()`
    - `x` -> `this.x`  (add `this.` prefix to unprefixed member references and
      method calls that are not local variables)
- `for-each` loop -> `for-of` loop
- simple `ArrayList` implementation in Javascript (wrapper over Array)
    


<main></main>

Converted p5.js:
```javascript
{% include_relative bounce_with_class.js %}```

Original Processing:
```java
{% include_relative bounce_with_class.pde %}```




<script src="../p5/p5.min.js"></script>
<script src="cat.js"></script>

# cat

The p5.js `load*()` functions (`loadImage`, `loadFont`, ...) are asynchronous,
and may not complete if called in `setup()`.  p5.js has a `preload()` function
that is guaranteed to return before `setup()` is called.  

During conversion, we move any `load` functions from `setup()` to `preload()`.


<main></main>

Converted p5.js:
```javascript
{% include_relative cat.js %}```

Original Processing:
```java
{% include_relative cat.pde %}```


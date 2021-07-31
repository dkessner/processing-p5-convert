---
layout: default
---


<script src="../p5/p5.min.js"></script>
<script src="hello.js"></script>

# hello

Transformations:
- `size()` -> `createCanvas()`
- function declarations: `void/int/...` -> `function`
- Processing color/int literals: `#ff1234`-> `'#ff1234'`

<main></main>

Converted p5.js:
```javascript
{% include_relative hello.js %}```

Original Processing:
```java
{% include_relative hello.pde %}```


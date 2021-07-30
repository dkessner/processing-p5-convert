

<script src="../p5/p5.min.js"></script>
<script src="hello_3d.js"></script>

# hello_3d

Transformations:
- `P3D` -> `WEBGL`
- For 3D sketches, p5.js origin is at the center of screen, instead of the
  upper left corner.  Insert at beginning of `draw()`:
    - `translate(-width/2, -height/2);`

<main></main>

Converted p5.js:
```javascript
{% include_relative hello_3d.js %}```

Original Processing:
```java
{% include_relative hello_3d.pde %}```


---
---

<script src="../p5/p5.min.js"></script>
<script src="../p5/p5.sound.min.js"></script>
<script src="hello_sound.js"></script>

# hello_sound


Transformations:
- comment out all `import` statements (preprocessing before parsing --
  java-parser doesn't like them)
- `new SoundFile(this, filename)` -> `loadSound(filename)` (not sure why
  Processing doesn't have this function)


Web pages need to include p5.js sound library:
```html
<script src="/path/to/p5.sound.min.js"></script>
```

Open access dataset of cat vocalizations:
[CatMeows](https://zenodo.org/record/4008297#.YP2Al6JKiV4)


<main></main>

Converted p5.js:
```javascript
{% include_relative hello_sound.js %}```

Original Processing:
```java
{% include_relative hello_sound.pde %}```


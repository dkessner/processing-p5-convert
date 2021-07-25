

<script src="../p5/p5.min.js"></script>
<script src="hello_font.js"></script>

# hello_font

Both Processing and p5.js allow the specification of fonts with either a
.ttf/.otf filename or a font string.

Processing
```java
    PFont pf;

    pf = createFont("filename.otf", 32);    // create PFont object from .ttf/.otf filename
    // or
    pf = createFont("Courier", 32);         // create PFont object from font string

    textFont(fontObject);                   // set current font (object only)
```

p5.js 
```javascript
    let pf;

    pf = loadFont('filename.otf');          // create object from .ttf/.otf file

    textFont(pf);                           // set current font (object)
    // or
    textFont("Courier");                    // set current font (font string)
```

We can make Processing and p5.js converted code to work in the same directory,
using fonts specified from font strings or .ttf/.otf font files.

The conversion to p5.js does the following:
- transforms `createFont()` to `loadFont()`
- moves the function call to `preload()`
- removes the 2nd argument: p5.js assumes this is a callback function,
    and the numeric argument throws an error
- if the Processing `createFont()` call has a string with no filename extension,
    we bind our variable (`pf` above) to a string, which is handled properly
    by the p5.js `textFont()`

[Gluk fonts](http://www.glukfonts.pl/)


<main></main>

Converted p5.js:
```javascript
{% include_relative hello_font.js %}```

Original Processing:
```java
{% include_relative hello_font.pde %}```


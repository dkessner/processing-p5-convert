

<script src="../p5/p5.min.js"></script>
<script src="hello_font.js"></script>

# hello_font

Processing has two font functions:
```java
    createFont("Georgia", 32); // String may be filename .ttf or .otf
    loadFont("LetterGothicStd-32.vlw"); // Processing format .vlw only
```

p5.js has the font function:
```javascript
    loadFont('assets/inconsolata.otf');
    loadFont('assets/inconsolata.otf', callback); // optional callback
```

In order for both the Processing and p5.js converted code to work in the same
directory, we need to use standard .otf/.ttf font files loaded with
`createFont()` in Processing.

The conversion to p5.js does the following:
- transforms `createFont()` to `loadFont()`
- moves the function call to `preload()`
- removes the 2nd argument: p5.js assumes this is a callback function,
    and the numeric argument throws an error


<main></main>

Converted p5.js:
```javascript
{% include_relative hello_font.js %}```

Original Processing:
```java
{% include_relative hello_font.pde %}```


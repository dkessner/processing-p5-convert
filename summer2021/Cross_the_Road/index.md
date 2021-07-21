

<script src="/p5/p5.min.js"></script>
<script src="Cross_the_Road.js"></script>

# Cross_the_Road

<main></main>

Converted p5.js:

```javascript 
{% include_relative Cross_the_Road.js %}```

Original Processing:

```java 
{% include_relative Cross_the_Road.pde %}```



<script>
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
</script>



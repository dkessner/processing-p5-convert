---
title: minimal_example
layout: default 
---

<script src="{{ site.baseurl }}/p5/p5.min.js"></script>
<script src="{{ site.baseurl }}/js/processing-p5-convert-bundle.js"></script>
<script src="{{ site.baseurl }}/js/processing-p5-convert-bootstrap.js"></script>

# minimal example


Try it yourself!
- Download [processing-p5-convert-minimal.zip](https://github.com/dkessner/processing-p5-convert/releases/download/v1.0-alpha.1/processing-p5-convert-minimal.zip).
- Unzip the file into a directory.
- Start a local web server (e.g. `python3 -m http.server`) in that directory.
- Open your browser to the page (e.g. `localhost:8000`)

[More info about local web servers](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)

<main id="ppconvert" src="minimal/minimal.pde"></main>


```
minimal
    - index.html
    - minimal.pde
    - p5.min.js
    - processing-p5-convert-bundle.js
    - processing-p5-convert-bootstrap.js
```

`index.html`:
```html
{% include_relative minimal/index.html%}```


`minimal.pde`:
```java
{% include_relative minimal/minimal.pde %}```




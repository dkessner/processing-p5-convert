---
layout: default
---

<!-- index.md -->

<script type="module" src="js/processing-p5-convert-bundle.js"></script>

<!-- codemirror -->
<link rel="stylesheet" href="codemirror/lib/codemirror.css">
<link rel="stylesheet" href="codemirror/theme/blackboard.css">
<link rel="stylesheet" href="codemirror/theme/cobalt.css">
<script src="codemirror/lib/codemirror.js"></script>
<script src="codemirror/mode/javascript/javascript.js"></script>
<script src="codemirror/mode/clike/clike.js"></script>

<!-- p5 -->
<script src="p5/p5.min.js"></script>
<script src="p5/p5.sound.min.js"></script>


# Processing input

<textarea id="processing-p5-convert-input"></textarea>

<button class="btn" id="processing-p5-convert-button">Convert and run!</button>

<main></main>
<br/>

# p5.js output

<textarea id="processing-p5-convert-output"></textarea>

<!--
<iframe id="editor"
    title="p5.js web editor embed"
    width="1000"
    height="600"
    src="https://editor.p5js.org/">
</iframe>
-->

<!-- initialization -->

<script src="js/index.js"></script>

<script>

    let input = document.getElementById("processing-p5-convert-input");

    inputCodeMirrorEditor = CodeMirror.fromTextArea(input, {
      lineNumbers: true,
      theme: "cobalt",
      mode: "clike"
    });

    inputCodeMirrorEditor.setSize("100%", 600);

    let output = document.getElementById("processing-p5-convert-output");
    output.value = "";

    outputCodeMirrorEditor = CodeMirror.fromTextArea(output, {
      lineNumbers: true,
      theme: "cobalt",
      mode: "javascript",
      readOnly: true
    });

    outputCodeMirrorEditor.setSize("100%", 600);

</script>


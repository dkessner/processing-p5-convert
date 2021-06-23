<!-- index.md -->

<!-- codemirror -->
<link rel="stylesheet" href="codemirror/lib/codemirror.css">
<link rel="stylesheet" href="codemirror/theme/blackboard.css">
<script src="codemirror/lib/codemirror.js"></script>
<script src="codemirror/mode/javascript/javascript.js"></script>
<script src="codemirror/mode/clike/clike.js"></script>


<script src="p5/p5.min.js"></script>
<script src="hello/hello.js"></script>


<textarea id="processing-p5-convert-input"
          style="width: 80%; height: 20em;"></textarea>

<button id="processing-p5-convert-button">Convert and run!</button>

<main></main>

<textarea id="processing-p5-convert-output"
          style="width: 80%; height: 20em;"></textarea>

<br/>


<!--
<iframe id="editor"
    title="p5.js web editor embed"
    width="1000"
    height="600"
    src="https://editor.p5js.org/">
</iframe>
-->

<script type="module" src="processing-p5-convert-bundle.js"></script>
<script src="index.js"></script>

<script>

    let input = document.getElementById("processing-p5-convert-input");

    inputCodeMirrorEditor = CodeMirror.fromTextArea(input, {
      lineNumbers: true,
      theme: "blackboard",
      mode: "clike"
    });

    inputCodeMirrorEditor.setSize("100%", 400);

    let output = document.getElementById("processing-p5-convert-output");
    output.value = helloProcessing;

    outputCodeMirrorEditor = CodeMirror.fromTextArea(output, {
      lineNumbers: true,
      theme: "blackboard",
      mode: "javascript",
      readonly: true
    });


</script>


 //
 // hello_3d
 //
 function setup() {
     createCanvas(400, 400, WEBGL);
 }

 function draw() {
     translate(-width / 2, -height / 2);
     background(0);
     lights();
     fill(0, 255, 0);
     stroke(0);
     push();
     translate(100, 100, 0);
     rotateZ(frameCount * 0.01);
     rotateX(frameCount * 0.01);
     rotateY(frameCount * 0.01);
     box(70, 70, 70);
     pop();
     push();
     translate(300, 300, 0);
     rotateZ(frameCount * 0.01);
     rotateX(frameCount * 0.01);
     rotateY(frameCount * 0.01);
     sphere(70);
     pop();
 }

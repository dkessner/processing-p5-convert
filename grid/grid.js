 function setup() {
     createCanvas(400, 400);
 }

 function drawFace(x, y) {
     fill(255);
     ellipse(x, y, 100, 100);
     fill(0);
     ellipse(x - 25, y - 10, 20, 20);
     ellipse(x + 25, y - 10, 20, 20);
     ellipse(x, y + 25, 40, 20);
     return 0;
 }

 function draw() {
     background(0);
     for (let i = 0; i < 4; i++) {
         for (let j = 0; j < 4; j++) {
             fill((i + j) % 2 * 255);
             rect(j * 100, i * 100, 100, 100);
             drawFace(j * 100 + 50, i * 100 + 50);
         }
     }
 }

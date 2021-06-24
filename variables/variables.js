 let x = 100;

 function setup() {
     createCanvas(400, 400);
 }

 function draw() {
     background(0);
     ellipse(x, 200, 100, 100);
     x += 5;
     if (x > width + 50) x = -50;
 }

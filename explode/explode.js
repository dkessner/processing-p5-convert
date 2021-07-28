 let explosionCount = 17;
 let explosion = new Array(explosionCount);
 let exploding = false;
 let explosionIndex = 0;

 function setup() {
     createCanvas(400, 400);
     imageMode(CENTER);
 }

 function preload() {
     for (let i = 0; i < explosion.length; i++) explosion[i] = loadImage("data/explode" + i + ".png");
 }

 function draw() {
     background(0);
     if (exploding == true) {
         if (explosionIndex < explosion.length) image(explosion[explosionIndex], width / 2, height / 2);
         if (frameCount % 10 == 0) explosionIndex++;
     } else {
         ellipse(width / 2, height / 2, 50, 50);
     }
 }

 function keyPressed() {
     if (exploding == true) {
         exploding = false;
     } else {
         exploding = true;
         explosionIndex = 0;
     }
 }

 function mousePressed() {
     keyPressed();
 }

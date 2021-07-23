 function setup() {
     createCanvas(400, 400);
 }

 function draw() {
     background(0);
     for (let i = 0; i < 4; i++) {
         for (let j = 0; j < 4; j++) {
             fill((i + j) % 2 * 255);
             rect(j * 100, i * 100, 100, 100);
         }
     }
 }

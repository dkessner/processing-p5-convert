 function setup() {
     createCanvas(400, 400);
 }
 let n = 0x29a;

 function drawFace(x, y) {
     fill(255);
     ellipse(x, y, 100, 100);
     fill(0);
     push();
     translate(-25, -10);
     ellipse(x, y, 20, 20);
     pop();
     push();
     translate(25, -10);
     ellipse(x, y, 20, 20);
     pop();
     ellipse(x, y + 25, 40, 20);
     return 0;
 }

 function draw() {
     background(0);
     for (let i = 0; i < 4; i++) {
         for (let j = 0; j < 4; j++) {
             fill((i + j) % 2 * 255);
             rect(j * 100, i * 100, 100, 100);
         }
     }
     let k = 0;
     while (k < 4) {
         drawFace(k * 100 + 50, k * 100 + 50);
         k++;
     }
     do {
         fill(255 * (k + 1) / 4);
         rect(k * 100, (3 - k) * 100, 100, 100);
         switch (k) {
             case 0:
                 fill(255, 0, 0);
                 break;
             case 1:
                 fill(0, 255, 0);
                 break;
             case 2:
                 fill(0, 0, 255);
                 break;
             case 3:
                 fill(255, 0, 255);
                 break;
         }
         rect(k * 100 + 25, (3 - k) * 100 + 25, 50, 50);
     } while (k-- > 0);
 }

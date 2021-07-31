 let n = 0x29a;
 let dummy = [1, 2, 3, 4];
 let numbers = [
     [1, 2, 3, 4],
     [5, 6, 7, 8],
     [9, 10, 11, 12],
     [13, 14, 15, 16]
 ];

 function setup() {
     createCanvas(400, 400);
     console.log("computeSum: " + computeSum(numbers));
     console.log("computeSum2: " + computeSum2(numbers));
 }

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

 function computeSum(numbers) {
     let total = 0;
     for (let row of numbers)
         for (let number of row) total += number;
     return total;
 }

 function computeSum2(numbers) {
     let total = 0;
     for (let i = 0; i < numbers.length; i++)
         for (let j = 0; j < numbers[i].length; j++) total += numbers[i][j];
     return total;
 }

 function draw() {
     background(0);
     textSize(20);
     textAlign(CENTER, CENTER);
     for (let i = 0; i < 4; i++) {
         for (let j = 0; j < 4; j++) {
             fill((i + j) % 2 * 255);
             rect(j * 100, i * 100, 100, 100);
             fill((i + j + 1) % 2 * 255);
             text(numbers[i][j], j * 100 + 50, i * 100 + 50);
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
     for (let i = 0; i < 4; i++)
         for (let j = 0; j < 4; j++) {
             fill(255, 0, 0);
             text(numbers[i][j], j * 100 + 50, i * 100 + 50);
         }
 }

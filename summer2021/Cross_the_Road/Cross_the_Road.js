 let gameState = 0;
 let bg;
 let elephant1;
 let elephant2;
 let redcar;
 let skybluecar;
 let bluecar;
 let darkbluecar;
 let pinkcar;
 let yellowcar;
 let greencar;
 let whitecar;
 let playerX;
 let playerY;
 let font;
 let r;
 let s;
 let b;
 let d;
 let p;
 let y;
 let g;
 let w;
 let r2;
 let w2;
 let s2;
 let g2;
 let p2;
 let y2;
 let d2;
 let b2;

 function setup() {
     createCanvas(800, 800);
     elephant1.resize(width / 4 + 50, height / 4 + 50);
     elephant2.resize(width / 4, height / 4);
     bg.resize(800, 800);
     redcar.resize(300, 150);
     skybluecar.resize(300, 150);
     bluecar.resize(250, 250);
     darkbluecar.resize(300, 300);
     pinkcar.resize(300, 300);
     yellowcar.resize(250, 300);
     greencar.resize(300, 150);
     whitecar.resize(250, 200);
     playerX = 400;
     playerY = 750;
     r = 0;
     w = 800;
     r2 = 500;
     w2 = 300;
     g = 600;
     d = 400;
     s = 800;
     p = 200;
     y = 300;
     g2 = 600;
     s2 = 400;
     p2 = 600;
     y2 = 400;
     d2 = 200;
 }

 function preload() {
     elephant1 = loadImage("elephant.png");
     elephant2 = loadImage("elephant2.png");
     bg = loadImage("background.png");
     redcar = loadImage("redcar.png");
     skybluecar = loadImage("skybluecar.png");
     bluecar = loadImage("bluecar.png");
     darkbluecar = loadImage("darkbluecar.png");
     pinkcar = loadImage("pinkcar.png");
     yellowcar = loadImage("yellowcar.png");
     greencar = loadImage("greencar.png");
     whitecar = loadImage("whitecar.png");
 }

 function draw() {
     if (gameState == 0) drawStart();
     else if (gameState == 1) drawGame1();
     else if (gameState == 2) drawGame2();
     if (gameState == 3) drawGame3();
     else if (gameState == 4) drawWin();
     else if (gameState == 5) drawLose();
 }

 function keyPressed() {
     if (gameState == 0) {
         if (key == ' ') {
             gameState = 3;
         } else if (keyCode == ENTER) {
             gameState = 1;
             playerX = 400;
             playerY = 750;
         } else if (keyCode == ALT) {
             gameState = 2;
             playerX = 400;
             playerY = 750;
         }
     }
     if (keyCode == TAB) {
         gameState = 0;
     }
     if (keyCode == UP_ARROW) {
         playerY -= 10;
     } else if (keyCode == DOWN_ARROW) {
         playerY += 10;
     } else if (keyCode == RIGHT_ARROW) {
         playerX += 10;
     } else if (keyCode == LEFT_ARROW) {
         playerX -= 10;
     } else if (key == '0') {
         playerY -= 10;
         playerX -= 10;
     } else if (key == 'o') {
         playerY += 10;
         playerX -= 10;
     } else if (key == 'l') {
         playerX += 10;
         playerY += 10;
     } else if (key == 'p') {
         playerX += 10;
         playerY -= 10;
     }
 }

 function drawStart() {
     imageMode(CORNER);
     background(bg);
     textAlign(CENTER);
     textSize(45);
     fill("#8EFFE4");
     text("Help the Elephant Cross the Road!", width / 2, height / 2 - 200);
     text("Click Enter to play Easy", width / 2, height / 2 - 100);
     text("Click Alt to play Medium", width / 2, height / 2);
     text("Click Space to play Hard", width / 2, height / 2 + 100);
     imageMode(CENTER);
     image(elephant1, width / 2, height / 2 + 200);
 }

 function drawGame1() {
     background("#777C77");
     fill("#39D151");
     rect(0, 0, 800, 200);
     rect(0, 600, 800, 200);
     image(elephant2, playerX, playerY);
     image(redcar, r, r2);
     image(whitecar, w, w2);
     w = w - 2;
     r = r + 2;
     if (playerY == 200) {
         gameState = 4;
     }
     if (r == 800 + 100) {
         r = 0;
     }
     if (w == 0 + 100) {
         w = 800;
     }
     if (playerX > r && playerX > r + 250 && playerY > r2 && playerY < r2 + 100) {
         gameState = 5;
     }
     if (playerX > w && playerX > r + 250 && playerY > w2 && playerY < w2 + 100) {
         gameState = 5;
     }
 }

 function drawGame2() {
     background("#777C77");
     fill("#39D151");
     rect(0, 0, 800, 100);
     rect(0, 700, 800, 100);
     image(elephant2, playerX, playerY);
     image(greencar, g, g2);
     image(skybluecar, s, s2);
     image(pinkcar, p, p2);
     image(yellowcar, y, y2);
     image(darkbluecar, d, d2);
     s = s + 2;
     g = g - 2;
     y = y + 2;
     p = p - 2;
     d = d + 2;
     if (playerY == 150) {
         gameState = 4;
     }
     if (s == 800 + 100) {
         s = 0;
     }
     if (g == 0 + 100) {
         g = 800;
     }
     if (d == 800 + 100) {
         d = 0;
     }
     if (p == 0 + 100) {
         p = 800;
     }
     if (y == 800 + 100) {
         y = 0;
     }
     if (playerX > s && playerX < s + 300 && playerY > s2 && playerY < s2 + 100) {
         gameState = 5;
     }
     if (playerX > p && playerX < p + 300 && playerY > p2 && playerY < p2 + 100) {
         gameState = 5;
     }
     if (playerX > y && playerX < y + 300 && playerY > y2 && playerY < y2 + 100) {
         gameState = 5;
     }
     if (playerX > g && playerX < g + 250 && playerY > g2 && playerY < g2 + 100) {
         gameState = 5;
     }
 }

 function drawGame3() {
     background("#777C77");
     fill("#39D151");
     rect(0, 0, 800, 100);
     rect(0, 700, 800, 100);
     image(elephant2, playerX, playerY);
 }

 function drawWin() {
     imageMode(CORNER);
     background(bg);
     fill("#28A03F");
     text("You Win!", width / 2, height / 2 - 50);
     text("Click Tab to Play Again", width / 2, height / 2 + 50);
 }

 function drawLose() {
     imageMode(CORNER);
     background(bg);
     fill("#FC2424");
     text("You Lost!", width / 2, height / 2 - 50);
     text("Click Tab to Play Again", width / 2, height / 2 + 50);
 }

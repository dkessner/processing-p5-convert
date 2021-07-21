
class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}

 class Coin {
     coinX;
     coinY;
     constructor() {
         this.coinX = random(50, 400);
         this.coinY = random(50, 400);
     }
     display() {
         image(coin, this.coinX, this.coinY);
         if (dist(playerdinoA, playerdinoB, this.coinX, this.coinY) < 60) {
             this.coinX = width + 10000;
             this.coinY = height + 10000;
             score += 1;
         }
     }
 }
 let dino;
 let rock;
 let dinofood;
 let coinbag;
 let coin;
 let bluedino;
 let finish;
 let start;
 let arrow;
 let start1;
 let fire;
 let rockX;
 let rockY;
 let playerdinoA;
 let playerdinoB;
 let leafX;
 let leafY;
 let fireX;
 let fireY;
 let bluedinoX;
 let bluedinoY;
 let finishX;
 let finishY;
 let arrowX;
 let arrowY;
 let arrowVX;
 let arrowVY;
 let alarm = 0;
 let baskerville;
 let state = 0;
 let score = 0;
 let coins;

 function setup() {
     createCanvas(600, 600);
     baskerville = createFont("Baskerville-BoldItalic", 20);
     imageMode(CENTER);
     dino.resize(200, 200);
     rock.resize(200, 100);
     coin.resize(50, 50);
     coinbag.resize(150, 230);
     bluedino.resize(100, 110);
     finish.resize(100, 160);
     arrow.resize(50, 100);
     initialize();
 }

 function preload() {
     dino = loadImage("dino.png");
     dinofood = loadImage("dinofood.png");
     rock = loadImage("rock.png");
     coin = loadImage("coin.png");
     coinbag = loadImage("coin bag.png");
     bluedino = loadImage("bluedino.png");
     finish = loadImage("finish.png");
     fire = loadImage("fire.png");
     arrow = loadImage("arrow.png");
     start1 = loadImage("start1.png");
 }

 function initialize() {
     playerdinoA = 100;
     playerdinoB = 100;
     rockX = 500;
     rockY = 100;
     leafX = 100;
     leafY = 100;
     bluedinoX = 100;
     bluedinoY = 100;
     finishX = playerdinoA + 400;
     finishY = playerdinoB + 400;
     arrowX = random(50, 400);
     arrowY = random(50, 400);
     arrowVX = random(1, 4);
     arrowVY = random(1, 4);
     coins = new ArrayList();
     for (let i = 0; i < 18; i++) coins.add(new Coin());
     score = 0;
 }

 function draw() {
     background("#61C9F7");
     if (state == 0) drawStart();
     else if (state == 1) drawGame1();
     else if (state == 2) drawGame2();
     else if (state == 3) drawGame3();
     else drawEnd();
 }

 function drawStart() {
     fill("#3AF502");
     textFont(baskerville, 30);
     text("Dino Game", 260, 300);
     fill("#F72073");
     textFont(baskerville, 20);
     text("Press Any Key to Begin", 240, 330);
 }

 function drawGame1() {
     background("#AEFAB4");
     text("LEVEL ONE", 250, 70);
     text("Get the Dino to the Leafs without", 40, 500);
     text(" letting the Meteorite hit them", 40, 530);
     image(dinofood, leafX, leafY);
     leafX = 500;
     leafY = 500;
     if (dist(playerdinoA, playerdinoB, leafX, leafY) < 100) {
         state = 2;
         playerdinoA = 100;
         playerdinoB = 100;
     }
     image(dino, playerdinoA, playerdinoB);
     if (dist(playerdinoA, playerdinoB, rockX, rockY) < 90) {
         fireX = playerdinoA;
         fireY = playerdinoB;
         alarm = millis() + 1500;
     }
     if (millis() < alarm) {
         image(fire, fireX, fireY);
         playerdinoA = 90;
         playerdinoB = 90;
         rockX = 500;
         rockY = 30;
     }
     image(rock, rockX, rockY);
     rockX = rockX - 2.3;
     rockY = rockY + 2.3;
     if (rockX > width - 70) {
         rockX = 500;
         rockY = 30;
     }
     if (rockY > height - 70) {
         rockX = 500;
         rockY = 30;
     }
 }

 function drawGame2() {
     background("#FACCF2");
     fill("#6C5ECE");
     textFont(baskerville);
     text("LEVEL TWO", 250, 70);
     text("Collect 15 Coins to Advance!", 100, 500);
     text("score:" + score, 20, 20);
     image(coinbag, 450, 450);
     image(dino, playerdinoA, playerdinoB);
     for (let coin of coins) coin.display();
     if (score >= 15) {
         state = 3;
         playerdinoA = 100;
         playerdinoB = 100;
     }
 }

 function drawGame3() {
     background("#B2C8FF");
     fill("#A2EA8E");
     text("LEVEL THREE", 250, 70);
     image(finish, finishX, finishY);
     image(start1, 100, 100);
     text("Avoid the Arrows and get to the Trophy!", 100, 500);
     image(dino, playerdinoA, playerdinoB);
     image(bluedino, playerdinoA - bluedinoX, playerdinoB - bluedinoY);
     image(arrow, arrowX, arrowY);
     arrowX += arrowVX;
     arrowY += arrowVY;
     if (arrowX < 0 || arrowX > width - 50) arrowVX *= -1;
     if (arrowY < 0 || arrowY > height - 50) arrowVY *= -1;
     if (dist(playerdinoA, playerdinoB, arrowX, arrowY) < 100) {
         playerdinoA = 100;
         playerdinoB = 100;
     }
     if (dist(playerdinoA, playerdinoB, finishX, finishY) < 100) {
         drawEnd();
         arrowVY = 0;
         arrowVX = 0;
     }
 }

 function drawEnd() {
     background("#C9FFB9");
     fill("#FF525E");
     text("You Won! Hit P to Play Again", 150, 300);
 }

 function keyPressed() {
     {
         if (state == 0) state = 1;
     } {
         if (keyCode == ('R')) {
             playerdinoA = 100;
             playerdinoB = 100;
         }
     } {
         if (keyCode == ('P')) {
             state = 0;
             initialize();
         }
         if (keyCode == RIGHT_ARROW) {
             playerdinoA += 10;
         } else if (keyCode == LEFT_ARROW) {
             playerdinoA += -10;
         } else if (keyCode == UP_ARROW) {
             playerdinoB += -10;
         } else if (keyCode == DOWN_ARROW) {
             playerdinoB += 10;
         } else if (keyCode == ('S')) {
             if (state == 0) state = 1;
             else if (state == 1) state = 2;
             else if (state == 2) state = 3;
             else if (state == 3) state = 4;
         }
     }
 }


class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}

 class Raindrop {
     x;
     y;
     vx;
     vy;
     r;
     c;
     alive = true;
     constructor() {
         this.r = 25;
         this.x = random(0, width);
         this.y = random(0, height);
         this.vx = 0;
         this.vy = random(1, 6);
         this.c = color("#34aeeb");
     }
     display() {
         if (this.alive == false) {
             return;
         }
         fill(this.c);
         noStroke();
         ellipse(this.x, this.y, 2 * this.r, 2 * this.r);
         this.x += this.vx;
         this.y += this.vy;
         if (this.y > height + 200) {
             this.y = -200;
             this.x = random(0, width);
         }
     }
 }
 let greenhouse;
 let plant;
 let state = 0;
 let playerX = 300;
 let playerY = 525;
 let score = 0;
 let raindrops;

 function setup() {
     createCanvas(600, 600);
     greenhouse.resize(600, 600);
     plant.resize(75, 75);
     raindrops = new ArrayList();
     for (let i = 0; i < 7; i++) {
         let r = new Raindrop();
         raindrops.add(r);
     }
 }

 function preload() {
     greenhouse = loadImage("greenhouse.png");
     plant = loadImage("plant.png");
 }

 function draw() {
     background(255);
     if (state == 0) drawStart();
     else if (state == 1) drawGame();
     else drawEnd();
 }

 function drawStart() {
     background("#28853d");
     fill(255);
     text("welcome to the greenhouse. click space 2 start", 150, 300);
     textSize(13);
     text("goals: collect as many raindrops as u can and DON'T GET HIT BY PESTISIDES!", 75, 400);
 }

 function drawGame() {
     background(255);
     imageMode(CORNER);
     image(greenhouse, 0, 0);
     imageMode(CENTER);
     image(plant, playerX, playerY);
     fill(0);
     text("score: " + score, 13, 30);
     textSize(24);
     for (let r of raindrops) r.display();
 }

 function drawEnd() {}

 function keyPressed() {
     if (state == 0) state = 1;
     else if (state == 1) {
         if (keyCode == LEFT_ARROW) {
             playerX += -7;
         } else if (keyCode == RIGHT_ARROW) {
             playerX += 7;
         } else if (keyCode == UP_ARROW) {
             playerX += 7;
         } else if (keyCode == DOWN_ARROW) {
             playerX += -7;
         }
     } else if (state == 2) state = 0;
 }

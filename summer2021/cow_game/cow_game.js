
class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}

 class Ball {
     x;
     y;
     vx;
     vy;
     alive = true;
     display() {
         if (this.alive == false) return;
         fill(0, 255, 0);
         ellipse(this.x, this.y, 50, 50);
         this.x += this.vx;
         this.y += this.vy;
         if (this.x < 0 || this.x > width) this.vx = -this.vx;
         if (this.y < 0 || this.y > height) this.vy = -this.vy;
         if (dist(mouseX, mouseY, this.x, this.y) < 25) {
             this.alive = false;
             score += 100;
         }
     }
 }
 let cow;
 let farm;
 let score;
 let buttonY;
 let buttonX;
 let r;
 let pressed = false;
 let ball;
 let ball2;
 let ball3;
 let ball4;
 let ball5;
 let ball6;
 let ball7;
 let ball8;
 let ball9;
 let ball10;
 let state = 0;

 function setup() {
     createCanvas(600, 600);
     noCursor();
     cow.resize(100, 100);
     farm.resize(width, height);
     score = 0;
     ball = new Ball();
     ball.x = 200;
     ball.y = 200;
     ball.vx = 1;
     ball.vy = 2;
     ball2 = new Ball();
     ball2.x = 200;
     ball2.y = 200;
     ball2.vx = 2;
     ball2.vy = 1;
     ball3 = new Ball();
     ball3.x = 200;
     ball3.y = 200;
     ball3.vx = 3;
     ball3.vy = 4;
     ball4 = new Ball();
     ball4.x = 200;
     ball4.y = 200;
     ball4.vx = 4;
     ball4.vy = 3;
     ball5 = new Ball();
     ball5.x = 200;
     ball5.y = 200;
     ball5.vx = 6;
     ball5.vy = 5;
     ball6 = new Ball();
     ball6.x = 200;
     ball6.y = 200;
     ball6.vx = 5;
     ball6.vy = 6;
     ball7 = new Ball();
     ball7.x = 200;
     ball7.y = 200;
     ball7.vx = 7;
     ball7.vy = 8;
     ball8 = new Ball();
     ball8.x = 200;
     ball8.y = 200;
     ball8.vx = 8;
     ball8.vy = 7;
     ball9 = new Ball();
     ball9.x = 200;
     ball9.y = 200;
     ball9.vx = 7;
     ball9.vy = 8;
     ball10 = new Ball();
     ball10.x = 200;
     ball10.y = 200;
     ball10.vx = 9;
     ball10.vy = 10;
 }

 function preload() {
     cow = loadImage("cow.jpg");
     farm = loadImage("farm.jpg");
 }

 function draw() {
     background(255);
     if (state == 0) drawStart();
     else if (state == 1) drawGame();
     else drawEnd();
 }

 function drawStart() {
     background(0);
     image(farm, 0, 0);
     text("TRY TO COLLECT THE GRASS TO FEED YOUR HUNGRY COW!!", width / 4, height / 5);
     text("click 1 to start", width / 4, height / 4);
     fill(0, 0, 10);
 }

 function drawGame() {
     imageMode(CENTER);
     image(cow, mouseX, mouseY);
     text(score, 50, 50);
     ball.display();
     ball2.display();
     ball3.display();
     ball4.display();
     ball5.display();
     ball6.display();
     ball7.display();
     ball8.display();
     ball9.display();
     ball10.display();
     if (score >= 1000) state = 2;
 }

 function drawEnd() {
     fill(255, 0, 0);
     text("GAME OVER! GOOD JOB YOU FED THE COW.", width / 2, height / 2);
 }

 function keyPressed() {
     if (state == 0) state = 1;
 }

 function mousePressed() {
     if (dist(buttonX, buttonY, mouseX, mouseY) < r) {
         if (pressed == true) {
             pressed = false;
             score += 1000;
             buttonX = random(r, width - r);
             buttonY = random(r, height - r);
         } else {
             pressed = true;
         }
     }
 }


class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}

 //
 // bounce_with_class
 //
 class Ball {
     x;
     y;
     vx = 0;
     vy = 0;
     c;
     constructor(x, y) {
         this.x = x;
         this.y = y;
         this.vx = random(-3, 3);
         this.vy = random(-2, 2);
         this.c = color(random(255), random(255), random(255));
     }
     display() {
         fill(this.c);
         ellipse(this.x, this.y, 100, 100);
         this.update();
     }
     update() {
         this.x += this.vx;
         this.y += this.vy;
         if (this.x < 50 || this.x > width - 50) this.vx *= -1;
         if (this.y < 50 || this.y > height - 50) this.vy *= -1;
     }
     test(x) {
         x = 1;
         this.x = 2;
         this.y = 3;
         this.y = 4;
         return 0;
     }
 }
 let ball;
 let balls;

 function setup() {
     createCanvas(400, 400);
     ball = new Ball(width / 2, height / 2);
     balls = new ArrayList();
     for (let i = 0; i < 5; i++) createBall();
 }

 function createBall() {
     balls.add(new Ball(random(50, width - 50), random(50, height - 50)));
 }

 function draw() {
     background(0);
     ball.display();
     for (let b of balls) b.display();
     let temp = balls.get(0);
     temp.x += 50;
     temp.display();
     temp.x -= 50;
 }

 function keyPressed() {
     if (key == 'a') createBall();
     else if (key == 'r' && balls.size() > 1) balls.remove(0);
     else {
         console.log("We're here!");
     }
 }

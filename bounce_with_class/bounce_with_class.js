 class Ball {
     x;
     y;
     vx;
     vy;
     c;
     constructor() {
         this.x = 200;
         this.y = 200;
         this.vx = 3;
         this.vy = 2;
         this.c = color(random(255), random(255), random(255));
     }
     display() {
         fill(this.c);
         ellipse(this.x, this.y, 100, 100);
         this.x += this.vx;
         this.y += this.vy;
         if (this.x < 50 || this.x > width - 50) this.vx *= -1;
         if (this.y < 50 || this.y > height - 50) this.vy *= -1;
     }
 }
 let ball;
 let balls;

 function setup() {
     createCanvas(400, 400);
     ball = new Ball();
     balls = [];
 }

 function draw() {
     background(0);
     ball.display();
     for (let b of balls) b.display();
 }

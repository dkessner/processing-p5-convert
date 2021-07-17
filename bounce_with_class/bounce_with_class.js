
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
     c;
     constructor() {
         this.x = random(50, width - 50);
         this.y = random(50, height - 50);
         this.vx = random(-3, 3);
         this.vy = random(-2, 2);
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
     balls = new ArrayList();
     for (let i = 0; i < 5; i++) balls.add(new Ball());
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
     if (key == 'a') balls.add(new Ball());
     else if (key == 'r' && balls.size() > 1) balls.remove(0);
     else {
         console.log("How's it going?");
     }
 }

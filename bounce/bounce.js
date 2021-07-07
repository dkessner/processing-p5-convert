
class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}

 let x = 100;
 let y = 100;
 let vx = 5;
 let vy = 3;

 function setup() {
     createCanvas(400, 400);
 }

 function draw() {
     background(0);
     ellipse(x, y, 100, 100);
     x += vx;
     y += vy;
     if (x < 50 || x > width - 50) vx *= -1;
     if (y < 50 || y > height - 50) vy *= -1;
 }

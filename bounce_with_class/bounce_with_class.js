class ArrayList extends Array {
    constructor() {
        super(...[]);
    }
    size() {
        return this.length;
    }
    add(x) {
        this.push(x);
    }
    get(i) {
        return this[i];
    }
    remove(i) {
        this.splice(i, 1);
    }
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
    static radius = 50; //static int getRadius() {return radius;} // not valid Processing
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-3, 3);
        this.vy = random(-2, 2);
        this.c = color(random(255), random(255), random(255));
    }
    display() {
        fill(this.c);
        ellipse(this.x, this.y, Ball.radius * 2, Ball.radius * 2);
        this.update();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < Ball.radius || this.x > width - Ball.radius) this.vx *= -1;
        if (this.y < Ball.radius || this.y > height - Ball.radius)
            this.vy *= -1;
    }
    test(x) {
        x = 1;
        this.x = 2;
        this.y = 3;
        this.y = 4;
        let position = new p5.Vector();
        position.x = 5;
        position.y = 6;
        return 0;
    }
}
let ball;
let balls;
function setup() {
    createCanvas(400, 400);
    console.log("Ball.radius: " + Ball.radius); //println("Ball.getRadius(): " + Ball.getRadius());
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
    if (key == "a") createBall();
    else if (key == "r" && balls.size() > 1) balls.remove(0);
    else {
        console.log("We're here!");
    }
}
class Dummy {
    w;
    x;
    y;
    z;
    c = color(255, 0, 0);
    constructor() {} // public is optional/unnecessary in Processing
    /*constructor( x ) { } */ // multiple constructors not ok in Javascript
    hello() {
        console.log("Hello, world!");
        let c = color(255, 0, 0);
    }
}


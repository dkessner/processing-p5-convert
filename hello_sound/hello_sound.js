
class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}

 let meow;

/*
 function loadSound(filename) {
     return new SoundFile(this, filename);
 }
 */

 function setup() {
     createCanvas(400, 400);
     background(0);
     meow.play();
 }

 function preload() {
     meow = loadSound("meow.wav");
 }

 function draw() {
     background(0);
     if (dist(mouseX, mouseY, 200, 200) < 50) fill(0, 255, 0);
     else fill(0, 0, 255);
     ellipse(200, 200, 100, 100);
 }

 function mousePressed() {
     if (dist(mouseX, mouseY, 200, 200) < 50) meow.play();
 }

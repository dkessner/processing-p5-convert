
class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}

 let myFont;

 function setup() {
     createCanvas(400, 400);
     background(128);
     textFont(myFont, 128);
     fill(0);
     textAlign(CENTER, CENTER);
     text("!@#$%", width / 2, height / 2);
 }

 function preload() {
     //myFont = loadFont("data/sudegnakno4.ttf", 64);
     myFont = loadFont("data/sudegnakno4.ttf"); // TODO remove 2nd arg
 }

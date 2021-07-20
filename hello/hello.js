
class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}

 function setup() {
     createCanvas(400, 400);
 }

 function draw() {
     background(0);
     fill("#00ff00");
     ellipse(200, 200, 100, 100);
 }

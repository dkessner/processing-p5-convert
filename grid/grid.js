
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
     for (let i = 0; i < 4; i++) {
         for (let j = 0; j < 4; j++) {
             fill((i + j) % 2 * 255);
             rect(j * 100, i * 100, 100, 100);
         }
     }
 }

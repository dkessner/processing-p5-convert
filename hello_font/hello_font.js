 //
 // hello_font
 //
 let sudegnak;
 let courier;

 function setup() {
     createCanvas(400, 400);
     background(128);
     fill(0);
     textAlign(CENTER, CENTER);
     textFont(sudegnak, 128);
     text("!@#$%", width / 2, height / 2);
     textFont(courier, 14);
     text("The quick brown fox jumps over the lazy dog.", width / 2, height * 3 / 4);
 }

 function preload() {
     sudegnak = loadFont("data/sudegnakno4.ttf");
     courier = "Courier";
 }

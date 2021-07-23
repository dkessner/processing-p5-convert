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
     myFont = loadFont("data/sudegnakno4.ttf");
 }

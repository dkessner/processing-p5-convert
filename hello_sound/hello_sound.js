 //
 // hello_sound.pde
 //
 // [processing-p5-convert] import processing.sound.*;
 let meow;

 function setup() {
     createCanvas(400, 400);
     background(0);
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

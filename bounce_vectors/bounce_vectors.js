 //
 // bounce_vectors.pde
 //
 let position = new p5.Vector(100, 100);
 let velocity = new p5.Vector(5, 3);

 function setup() {
     createCanvas(400, 400);
 }

 function draw() {
     background(0);
     fill(0, 0, 255);
     ellipse(position.x, position.y, 100, 100);
     position.add(velocity);
     if (position.x < 50 || position.x > width - 50) velocity.x *= -1;
     if (position.y < 50 || position.y > height - 50) velocity.y *= -1;
 }

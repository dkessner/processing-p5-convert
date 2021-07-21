	
import processing.sound.*;


SoundFile meow;


void setup() {
  size(400, 400);
  background(0);
    
  meow = new SoundFile(this, "meow.wav");
  meow.play();
}      


void draw() 
{
    background(0);

    if (dist(mouseX, mouseY, 200, 200) < 50)
        fill(0, 255, 0);
    else
        fill(0, 0, 255);

    ellipse(200, 200, 100, 100);
}


void mousePressed()
{
    if (dist(mouseX, mouseY, 200, 200) < 50)
        meow.play(); 
}



PFont myFont;

void setup() 
{
    size(400, 400);
    background(128);

    myFont = createFont("data/sudegnakno4.ttf", 64);
    textFont(myFont, 128);

    fill(0);
    textAlign(CENTER, CENTER);
    text("!@#$%", width/2, height/2);
}


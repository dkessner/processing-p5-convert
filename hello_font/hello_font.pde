//
// hello_font.pde
//


PFont sudegnak;
PFont courier;


void setup() 
{
    size(400, 400);
    background(128);

    sudegnak = createFont("data/sudegnakno4.ttf", 64);
    courier = createFont("Courier", 32);

    fill(0);
    textAlign(CENTER, CENTER);

    textFont(sudegnak, 128);
    text("!@#$%", width/2, height/2);

    textFont(courier, 14);
    text("The quick brown fox jumps over the lazy dog.", width/2, height*3/4);
}




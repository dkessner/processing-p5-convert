//
// cat
//


PImage cat;
PImage mouse;
float mouse_x, mouse_y;


void setup() 
{
    size(400, 400);
    noCursor();

    cat = loadImage("cat.png");
    cat.resize(100, 100);

    mouse = loadImage("mouse.png");
    mouse.resize(50, 50);
    moveMouse();
}


void moveMouse()
{
    mouse_x = random(50, width-50);
    mouse_y = random(50, height-50);
}


void draw() 
{
    background(100);

    imageMode(CENTER);
    image(cat, mouseX, mouseY);
    image(mouse, mouse_x, mouse_y);

    if (dist(mouseX, mouseY, mouse_x, mouse_y) < 50)
      moveMouse();
}




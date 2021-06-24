//
// variables.pde
//


int x = 100;


void setup()
{
    size(400, 400);
}


void draw()
{
    background(0);
    ellipse(x, 200, 100, 100);

    x += 5;

    if (x > width + 50)
        x = -50;
}



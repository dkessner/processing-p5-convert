//
// variables.pde
//


float x = 100;
float y = 100;
float vx = 5;
float vy = 3;


void setup()
{
    size(400, 400);
}


void draw()
{
    background(0);
    ellipse(x, y, 100, 100);

    x += vx;
    y += vy;

    if (x < 50 || x > width-50)
        vx *= -1;

    if (y < 50 || y > height-50)
        vy *= -1;
}



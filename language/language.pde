//
// language.pde
//


float x = 0;


void setup()
{
    size(400, 400);
}


void draw()
{
    background(0);
    ellipse(x++, 200, 100, 100);

    if (x<width)
    {
      x = 0;
    }
}



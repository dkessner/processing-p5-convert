//
// bounce_with_class.pde
//


class Ball
{
    float x;
    float y;
    float vx;
    float vy;

    Ball()
    {
        x = 200;
        y = 200;
        vx = 3;
        vy = 2;
    }

    void display()
    {
        ellipse(x, y, 100, 100);

        x += vx;
        y += vy;

        if (x < 50 || x > width-50)
            vx *= -1;

        if (y < 50 || y > height-50)
            vy *= -1;
    }
}


Ball ball;


void setup()
{
    size(400, 400);
    ball = new Ball();
}


void draw()
{
    background(0);
    ball.display();
}



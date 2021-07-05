//
// bounce_with_class.pde
//


class Ball
{
    float x;
    float y;
    float vx;
    float vy;
    int c;

    Ball()
    {
        x = 200;
        y = 200;
        vx = 3;
        vy = 2;
        c = color(random(255), random(255), random(255));
    }

    void display()
    {
        fill(c);
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
ArrayList<Ball> balls;

void setup()
{
    size(400, 400);
    ball = new Ball();
    balls = new ArrayList<Ball>();
}


void draw()
{
    background(0);
    ball.display();
}



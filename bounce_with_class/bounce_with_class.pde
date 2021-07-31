//
// bounce_with_class
//


class Ball
{
    float x, y;
    float vx = 0, vy = 0;
    int c;

    Ball(float x, float y)
    {
        this.x = x;
        this.y = y;
        vx = random(-3, 3);
        vy = random(-2, 2);
        c = color(random(255), random(255), random(255));
    }

    void display()
    {
        fill(c);
        ellipse(x, y, 100, 100);
        update();
    }

    void update()
    {
        x += vx;
        y += vy;

        if (x < 50 || x > width-50)
            vx *= -1;

        if (y < 50 || y > height-50)
            vy *= -1;
    }

    int test(int x)
    {
        x = 1;
        this.x = 2;
        y = 3;
        this.y = 4;
        return 0;
    }
}


Ball ball;
ArrayList<Ball> balls;

void setup()
{
    size(400, 400);
    ball = new Ball(width/2, height/2);
    balls = new ArrayList<Ball>();

    for (int i=0; i<5; i++)
        createBall();      
}


void createBall()
{
    balls.add(new Ball(random(50,width-50), random(50,height-50)));
}


void draw()
{
    background(0);
    ball.display();

    for (Ball b : balls)
      b.display();

    Ball temp = balls.get(0);
    temp.x += 50;
    temp.display();
    temp.x -= 50;
}


void keyPressed()
{
    if (key == 'a')
        createBall();

    else if (key == 'r' && balls.size() > 1)
        balls.remove(0);

    else
    {
      println("We're here!");
    }
}



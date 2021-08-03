//
// bounce_with_class
//


class Ball
{
    float x, y;
    float vx = 0, vy = 0;
    int c;
    static final int radius = 50;
    //static int getRadius() {return radius;} // not valid Processing

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
        ellipse(x, y, radius*2, radius*2);
        update();
    }

    void update()
    {
        x += vx;
        y += vy;

        if (x < radius || x > width-radius)
            vx *= -1;

        if (y < radius || y > height-radius)
            vy *= -1; }

    int test(int x)
    {
        x = 1;
        this.x = 2;
        y = 3;
        this.y = 4;
        PVector position = new PVector();
        position.x = 5;
        position.y = 6;
        return 0;
    }
}


Ball ball;
ArrayList<Ball> balls;

void setup()
{
    size(400, 400);
    println("Ball.radius: " + Ball.radius);
    //println("Ball.getRadius(): " + Ball.getRadius());

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


public class Dummy
{
    int w, x, y, z;

    int c = color(255, 0, 0);

    public Dummy() {} // public is optional/unnecessary in Processing

    public Dummy(int x) {} // multiple constructors not ok in Javascript

    public void hello() 
    {
        println("Hello, world!");
        int c = color(255, 0, 0);
    }
}


//
// phyllotaxis.pde
//
// Darren Kessner
// Marlborough School
//


ArrayList<Ball> balls = new ArrayList<Ball>();

int period = 1;
int rate = 1;

float ballSpeed = 1;

int count = 0;

float colorPeriod = 200;
int currentColor = 0;


// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89

float tau = (1 + sqrt(5))/2;
float golden_angle_proportion = 1/tau/tau; // fraction of circle

float ratio = golden_angle_proportion;
// float ratio = golden_angle_proportion + .01;
//float ratio = golden_angle_proportion - .01;

//float ratio = 1./4;
//float ratio = 5./13;
//float ratio = 13/34.;
//float ratio = 21/55.;
//float ratio = 34./89;


//float ratio = .205;

//float ratio = 2./9;


void setup()
{
    size(600, 400);
    noCursor();

    //println("ratio: " + ratio);
    //println("angle: " + ratio*360.);
}


void draw()
{
    background(0);

    currentColor = myhue((frameCount % colorPeriod)/(float)colorPeriod);

    //text(balls.size(), 50, 50);
    
    for (Ball b : balls)
        b.display();

    if (frameCount % period == 0)
    {
        for (int i=0; i<rate; i++)
        {
            float t = 2*PI*ratio*count;
            count++;
            balls.add(new Ball(width/2, height/2, 
                               ballSpeed*cos(t), ballSpeed*sin(t),
                               currentColor));
        }
    }

    // clean up

    for (int i=balls.size()-1; i>=0; i--)
        if (!balls.get(i).alive)
            balls.remove(i);
}


void keyPressed()
{
    if (isLooping())
      noLoop();
    else
      loop();
}


class Ball
{
    float x;
    float y;
    float vx;
    float vy;
    int c;
    boolean alive;
    final int diameter = 6;

    Ball(float x, float y, float vx, float vy, int c)
    {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.c = c;
        this.alive = true;
    }

    void display()
    {
        fill(c);
        ellipse(x, y, diameter, diameter);

        x += vx;
        y += vy;

        if (x<0 || x>width || y<0 || y>height)
            alive = false;
    }
}


// translates x in [0,1] to a rainbow color
int myhue(float x)
{
    float t = 3*x - (int)(3*x);
    if (x < 1./3)
    {
        return color((1-t)*255, t*255, 0); // R->G
    }
    else if (x < 2./3)
    {
        return color(0, (1-t)*255, t*255); // G->B
    }
    else
    {
        return color(t*255, 0, (1-t)*255); // B->R
    }
}

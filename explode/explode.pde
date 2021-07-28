//
// explode.pde
//


final int explosionCount = 17;
PImage[] explosion = new PImage[explosionCount];

boolean exploding = false;
int explosionIndex = 0;


void setup()
{
    size(400, 400);
    imageMode(CENTER);

    for (int i=0; i<explosion.length; i++)
        explosion[i] = loadImage("data/explode" + i + ".png");
}


void draw()
{
    background(0);

    if (exploding == true)
    {
        if (explosionIndex < explosion.length)
            image(explosion[explosionIndex], width/2, height/2);

        if (frameCount%10 == 0)
          explosionIndex++;
    }
    else
    {
        ellipse(width/2, height/2, 50, 50);
    }
}


void keyPressed()
{
    if (exploding == true)
    {
        exploding = false;
    }
    else 
    {
        exploding = true;
        explosionIndex = 0;
    }
}

void mousePressed()
{
    keyPressed();
}


//
// grid.pde
//


void setup()
{
    size(400, 400);
}


private final int n = 0x29a;


int drawFace(int x, int y)
{
   fill(255);
   ellipse((float)x, y, 100, 100);
   fill(0);

   pushMatrix();
     translate(-25, -10);
     ellipse(x, y, 20, 20);
   popMatrix();
   
   pushMatrix();
     translate(25, -10);
     ellipse(x, y, 20, 20);
   popMatrix();

   ellipse(x, y+25, 40, 20);
   return 0;
}


void draw()
{
    background(0);

  	for (int i=0; i<4; i++)
    {
        for (int j=0; j<4; j++)
        {
            fill( (i+j)%2 * 255 );
            rect(j*100, i*100, 100, 100);
            drawFace(j*100+50, i*100+50);
        }
    }
}



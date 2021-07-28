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
        }
    }

    int k = 0;
    while (k < 4)
    {
        drawFace(k*100+50, k*100+50);
        k++;
    }

    do 
    {
        fill(255*(k+1)/4);
        rect(k*100, (3-k)*100, 100, 100);

        switch (k)
        {
            case 0:
              fill(255, 0, 0);
              break;
            case 1:
              fill(0, 255, 0);
              break;
            case 2:
              fill(0, 0, 255);
              break;
            case 3:
              fill(255, 0, 255);
              break;
        }
        rect(k*100+25, (3-k)*100+25, 50, 50);

    } while (k-- > 0);

     
}



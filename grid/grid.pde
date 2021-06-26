//
// grid.pde
//


void setup()
{
    size(400, 400);
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
}



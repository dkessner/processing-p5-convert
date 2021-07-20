
class Raindrop
{
  float x;
  float y;
  
  float vx;
  float vy;
  
  float r;
  int c;
  
  boolean alive = true;
  
  Raindrop()
  {
    r = 25;
    x = random(0, width);
    y = random(0, height);
    vx = 0;
    vy = random(1, 6);
    c = color (#34aeeb);
  }
  
  void display()
  {
    if(alive == false)
      {
        return;
      }
        
    fill(c);
    noStroke();
    ellipse(x, y, 2*r, 2*r);
    
    x +=vx;
    y +=vy;
    
    if (y>height+200)
    {
      y = -200;
      x= random(0, width);
      
    }
      

      
  }
}

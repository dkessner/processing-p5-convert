

class Ball
{
  // member variables
  
  int x;
  int y;
  int vx;
  int vy;
  boolean alive = true;
  
  // member functions
 
  void display()
  {
    if(alive == false)
      return;
      
    fill(0,255,0);
    ellipse(x, y, 50, 50);
    
    x += vx;
    y += vy;
    
    if (x<0 || x>width)
      vx = -vx;
      
    if (y<0 || y>height)
      vy = -vy;
      
      if (dist(mouseX,mouseY,x,y)<25)
      {
        
        alive = false;
        score += 100;
        
      }
      
  }
}

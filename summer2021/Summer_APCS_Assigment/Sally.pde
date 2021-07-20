class Sally
{
  float x, y, vy, ay;

  Sally()
  {
    y = int(300);
    vy = int(0);
    ay = 0.35;
    x = int(150);
  }

  void jump()
  {
    vy = -8;
  }

  void collision()
  {
    if (player == 1)
    {
      vy = 6;
    }
  }

  void display()
  {
    image(Sam, x, y);
    y+=vy;
    vy+=ay;
    if (y>300)
    {
      if (player == 0)
      {
        y = 300;
        vy = 0;
      } 
      if (player == 1)
      {
        vy = 7;
      }
    }
    collision();
  }
}

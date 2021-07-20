class Slides
{
  float a, b, va, vb;

  Slides(int aIn, int bIn, int vaIn, int vbIn)
  {
    a = aIn;
    b = bIn;
    va = vaIn;
    vb = vbIn;
  }

  Slides()
  {
    a = int(530);
    b = int(400);
    va = int(2);
    vb = int(0);
  }

  void updatePosition()
  {
    if(player == 0)
    {
    a+=va;
    b+=vb;
    a = a - 7;
    }
    else if(player == 1)
    {
      a = 150;
    }
  }

  void checkEdges()
  {
    if (a>width || a<0)
    {
      a = int(530);
      image(slide, a, b);
      score += 100;
    }
    if (dist(sally.x, sally.y, a, b) < 105)
    {
      player = 1;
    }
  }
  void display()
{
  image(slide, a, b);
  updatePosition();
  checkEdges();
}
}

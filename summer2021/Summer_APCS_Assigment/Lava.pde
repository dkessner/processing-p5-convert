class Lava
{
  float a, b, w, h, c;

  Lava(float aIn, float bIn, float wIn, float hIn, float cIn)
  {
    a = aIn;
    b = bIn;
    w = wIn;
    h = hIn;
    c = cIn;
  }

  void display()
  {
    rectMode(CORNER);
    noStroke();
    fill(#FF5517);
    rect(a,b,w,h);
  }
}

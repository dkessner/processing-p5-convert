class Solid {
  float a, b, w, h;

  Solid(float aIn, float bIn, float wIn, float hIn)
  {
    a = aIn;
    b = bIn;
    w = wIn;
    h = hIn;
  }
  

  void display()
  {
    rectMode(CORNER);
    noStroke();
    fill(random(255),random(255), random(255));
    rect(a, b, w, h);
  }
}


void setup()
{
    size(400, 400, P3D); 
}


void draw()
{
    background(0);
    lights();

    fill(0, 255, 0);
    stroke(0);

    pushMatrix();
    translate(100, 100, 0);
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    box(70, 70, 70);
    popMatrix();

    pushMatrix();
    translate(300, 300, 0);
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    sphere(70);
    popMatrix();
}

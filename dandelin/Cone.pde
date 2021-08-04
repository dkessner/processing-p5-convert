//
// Cone.java
//


public class Cone
{
    public Cone(float slantAngle)
    {
        this.slantAngle = slantAngle;
        this.n = 15;
        this.ySpacing = 15;
    }

    public Cone(float slantAngle, int n, float ySpacing)
    {
        this.slantAngle = slantAngle;
        this.n = n;
        this.ySpacing = ySpacing;
    }

    public void setSlantAngle(float slantAngle)
    {
        this.slantAngle = slantAngle;
    }

    public void display()
    {
        noFill();
        stroke(128, 128);

        // lines

        final float length = 400;
        float r = length*cos(slantAngle);
        float h = length*sin(slantAngle);

        for (int i=0; i<n; i++)
        {
            float theta = 2*PI*i/n;
            float z = r*cos(theta);
            float x = r*sin(theta);
            line(0, 0, 0, (float)x, (float)h, (float)z);
        }

        // circles

        final float m = tan(slantAngle);

        for (float y=10; y<h; y+=10)
        {
            pushMatrix();
            rotateX(PI/2);
            translate(0, 0, -y);
            float d = (y / m) * 2;
            ellipse(0, 0, d, d);
            popMatrix();
        }
    }

    private float slantAngle;
    private int n;
    private float ySpacing;
}

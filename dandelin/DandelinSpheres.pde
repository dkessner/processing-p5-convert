//
// DandelinSpheres.java
//


class DandelinSpheres
{
    DandelinSpheres()
    {
        this.cone = new Cone(coneSlantAngle);
        this.focus1 = new PVector();
        this.focus2 = new PVector();
        this.vertex1 = new PVector();
        this.vertex2 = new PVector();
        this.ellipseCenter = new PVector();
        this.orbit_t = 0;
        this.orbit1 = new PVector();
        this.orbit2 = new PVector();
        this.orbitEllipse = new PVector();
    }

    void display()
    {
        cone.display();
        
        // spheres

        noFill();
        stroke(200, 50);

        pushMatrix();
        translate(0, (float)y1, 0);
        sphere((float)r1);
        popMatrix();

        pushMatrix();
        translate(0, (float)y2, 0);
        sphere((float)r2);
        popMatrix();

        // circles

        noFill();
        stroke(255);
        strokeWeight(3);

        pushMatrix();
        translate(0, (float)circle1_y, 0);
        rotateX(PI/2);
        ellipse(0, 0, (float)circle1_r*2, (float)circle1_r*2);
        popMatrix();

        pushMatrix();
        translate(0, (float)circle2_y, 0);
        rotateX(PI/2);
        ellipse(0, 0, (float)circle2_r*2, (float)circle2_r*2);
        popMatrix();

        strokeWeight(1);

        // plane

        pushMatrix();
        translate(0, (float)planeIntercept, 0);
        rotateX(-PI/2);
        rotateZ(-PI/2);
        rotateX((float)planeSlantAngle);
        noFill();
        stroke(255);
        rect(-100, -100, 200, 200);
        popMatrix();

        drawEllipse();

        drawOrbit();

        update();
    }

    void drawEllipse()
    {
        pushMatrix();
        //pushStyle();

        // transformations

        translate(ellipseCenter.x, ellipseCenter.y, ellipseCenter.z);
        rotateX(-PI/2);
        rotateZ(-PI/2);
        rotateX((float)planeSlantAngle);

        // ellipse

        strokeWeight(3);
        stroke(0, 255, 0);
        noFill();
        ellipse(0, 0, (float)semiMinorAxis*2, (float)semiMajorAxis*2);

        // center, foci

        //noFill();
        stroke(0, 255, 0);
        ellipse(0, 0, 5, 5);

        stroke(255, 0, 0);
        ellipse(0, semiFocalDistance, 5, 5);
        ellipse(0, -semiFocalDistance, 5, 5);

        // vertices

        fill(0, 0, 255);
        stroke(0, 0, 255);
        ellipse(0, semiMajorAxis, 5, 5);
        ellipse(0, -semiMajorAxis, 5, 5);

        //popStyle();
        popMatrix();

        strokeWeight(1);
    }

    void drawSegment(PVector head, PVector tail, int c)
    {
        stroke(c);
        strokeWeight(3);
        line(head.x, head.y, head.z, tail.x, tail.y, tail.z);
        strokeWeight(1);
    }

    void drawOrbit()
    {
        pushMatrix();
        translate(orbit1.x, orbit1.y, orbit1.z);
        stroke(255, 0, 0);
        fill(255, 0, 0);
        sphere(5);
        popMatrix();

        pushMatrix();
        translate(orbit2.x, orbit2.y, orbit2.z);
        stroke(0, 0, 255);
        fill(0, 0, 255);
        sphere(5);
        popMatrix();

        pushMatrix();
        translate(orbitEllipse.x, orbitEllipse.y, orbitEllipse.z);
        stroke(0, 255, 0);
        fill(0, 255, 0);
        sphere(5);
        popMatrix();

        //int red = color(255, 0, 0);
        //int blue = color(0, 0, 255);

        drawSegment(orbit1, orbitEllipse, color(255, 0, 0));
        drawSegment(focus1, orbitEllipse, color(255, 0, 0));
        drawSegment(orbit2, orbitEllipse, color(0, 0, 255));
        drawSegment(focus2, orbitEllipse, color(0, 0, 255));
    }

    void displayVariables(int x, int y)
    {
        float dy = 25;

        text("coneSlantAngle: " + degrees((float)coneSlantAngle), x, y); y+=dy;
        text("mc: " + mc, x, y); y+=dy;
        text("mp: " + mp, x, y); y+=dy;
        text("r1: " + r1, x, y); y+=dy;
        text("r2: " + r2, x, y); y+=dy;
        text("y1: " + y1, x, y); y+=dy;
        text("y2: " + y2, x, y); y+=dy;
        text("circle1_y: " + circle1_y, x, y); y+=dy;
        text("circle1_r: " + circle1_r, x, y); y+=dy;
        text("d: " + d, x, y); y+=dy;
        text("planeSlantAngle: " + degrees((float)planeSlantAngle), x, y); y+=dy;
        text("planeIntercept: " + planeIntercept, x, y); y+=dy;
        text("focus1: " + focus1, x, y); y+=dy;
        text("focus2: " + focus2, x, y); y+=dy;
        text("vertex1: " + vertex1, x, y); y+=dy;
        text("vertex2: " + vertex2, x, y); y+=dy;
        text("semiMajorAxis: " + semiMajorAxis, x, y); y+=dy;
        text("semiMinorAxis: " + semiMinorAxis, x, y); y+=dy;
        text("ellipseCenter: " + ellipseCenter, x, y); y+=dy;
    }

    void update()
    {
        coneSlantAngle += vConeSlantAngle;
        cone.setSlantAngle(coneSlantAngle);

        r1 += vr1;
        r2 += vr2;

        mc = tan(coneSlantAngle); 
        mp = tan(planeSlantAngle);

        y1 = r1 / cos(coneSlantAngle);
        y2 = r2 / cos(coneSlantAngle);

        circle1_y = y1 - r1*cos(coneSlantAngle);
        circle1_r = r1*sin(coneSlantAngle);

        circle2_y = y2 - r2*cos(coneSlantAngle);
        circle2_r = r2*sin(coneSlantAngle);

        d = (y2-y1) / (1 + r2/r1);
        planeSlantAngle = acos(r1/d);
        planeIntercept = y1 + d;

        float t = PI/2-planeSlantAngle;
        focus1.set((float)(-r1*cos(t)), (float)(y1 + r1*sin(t)), 0);
        focus2.set((float)(r2*cos(t)), (float)(y2 - r2*sin(t)), 0);

        vertex1.set((float)(planeIntercept/(mc-mp)), (float)(planeIntercept*mc/(mc-mp)), 0); 
        vertex2.set((float)(planeIntercept/(-mc-mp)), (float)(planeIntercept*mc/(mc+mp)), 0); 

        semiMajorAxis = vertex1.dist(vertex2) / 2;
        semiFocalDistance = focus1.dist(focus2) / 2;
        semiMinorAxis = sqrt(semiMajorAxis*semiMajorAxis - semiFocalDistance*semiFocalDistance);

        ellipseCenter.set((focus1.x+focus2.x)/2, (focus1.y+focus2.y)/2, (focus1.z+focus2.z)/2); 

        // orbit

        orbit_t += orbit_vt;

        orbit1.set((float)(circle1_r*sin(orbit_t)), (float)circle1_y, (float)(circle1_r*cos(orbit_t)));
        orbit2.set((float)(circle2_r*sin(orbit_t)), (float)circle2_y, (float)(circle2_r*cos(orbit_t)));

        float x = planeIntercept / (tan(coneSlantAngle)/sin(orbit_t) - tan(planeSlantAngle));
        float z = x / tan(orbit_t);
        float r = sqrt(x*x + z*z);
        float y = tan(coneSlantAngle) * r;

        orbitEllipse.set((float)x, (float)y, (float)z);
    }

    // parameter accessors

    void startPushingConeSlantAngle(float v)
    {
        this.vConeSlantAngle = v;
    }

    void stopPushingConeSlantAngle()
    {
        this.vConeSlantAngle = 0;
    }

    void startPushingR1(float v)
    {
        this.vr1 = v;
    }

    void stopPushingR1()
    {
        this.vr1 = 0;
    }

    void startPushingR2(float v)
    {
        this.vr2 = v;
    }

    void stopPushingR2()
    {
        this.vr2 = 0;
    }

    private PApplet papplet;
    private Cone cone;

    // parameters / independent variables

    private float coneSlantAngle = PI/4;
    private float vConeSlantAngle = 0;

    private float mc; // slope of cone
    private float mp; // slope of plane

    private float r1 = 20;
    private float vr1 = 0;

    private float r2 = 140;
    private float vr2 = 0;

    // dependent variables

    private float y1;
    private float y2;

    private float circle1_y;
    private float circle1_r;

    private float circle2_y;
    private float circle2_r;

    private float d;                   // distance from y1 to planeIntercept
    private float planeIntercept;
    private float planeSlantAngle;

    private PVector focus1;
    private PVector focus2;

    private PVector vertex1;
    private PVector vertex2;

    private float semiMajorAxis;       // a
    private float semiMinorAxis;       // b
    private float semiFocalDistance;   // c

    private PVector ellipseCenter;

    private float orbit_t;
    private float orbit_vt = .01;

    private PVector orbit1;
    private PVector orbit2;
    private PVector orbitEllipse;
}

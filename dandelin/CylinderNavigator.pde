//
// CylinderNavigator.java
//


class CylinderNavigator
{
    void transform()
    {
        vrcoords();

        // we think of theta and y as cylindrical coordinates for the camera,
        // but we actually transform the coordinate system                    
        rotateY(-theta);     
        translate(0, -y, 0); 
    }

    void update()
    {
        theta += vtheta;
        y += vy;
    }

    void drawAxes()
    {
         float l = 200;

        colorMode(RGB, 255);

        // red positive x-axis
        stroke(255, 0, 0);
        line(0, 0, 0, l, 0, 0);
        stroke(255);
        line(-l, 0, 0, 0, 0, 0);

        // green positive y-axis
        stroke(0, 255, 0);
        line(0, 0, 0, 0, l, 0);
        stroke(255);
        line(0, -l, 0, 0, 0, 0);

        // blue positive z-axis
        stroke(0, 0, 255);
        line(0, 0, 0, 0, 0, l);
        stroke(255);
        line(0, 0, -l, 0, 0, 0);

        drawTicks();
    }

    void drawTicks()
    {
         int r = color(255, 0, 0);
         int g = color(0, 255, 0);
         int b = color(0, 0, 255);
         int w = color(255);

        // red boxes on x-axis

        stroke(0);

        for (int i=-4; i<=4; i++)
        {
            if (i==0) continue;
            fill(i>0 ? r : w);
            pushMatrix();
            translate(25*i, 0, 0);
            box(i%4==0 ? 10 : 5);
            popMatrix();
        }

        // green boxes on y-axis

        for (int i=-4; i<=4; i++)
        {
            if (i==0) continue;
            fill(i>0 ? g : w);
            pushMatrix();
            translate(0, 25*i, 0);
            box(i%4==0 ? 10 : 5);
            popMatrix();
        }

        // blue boxes on z-axis

        for (int i=-4; i<=4; i++)
        {
            if (i==0) continue;
            fill(i>0 ? b : w);
            pushMatrix();
            translate(0, 0, i*25);
            box(i%4==0 ? 10 : 5);
            popMatrix();
        }
    }


    void keyPressed()
    {
       float theta_speed = .03;
       float y_speed = 2;

        if (keyCode == RIGHT)
            vtheta = theta_speed;
        else if (keyCode == LEFT)
            vtheta = -theta_speed;
        else if (keyCode == UP)
            vy = y_speed;
        else if (keyCode == DOWN)
            vy = -y_speed;
    }

    void keyReleased()
    {
          if (keyCode == RIGHT || keyCode == LEFT)
              vtheta = 0;
          else if (keyCode == UP || keyCode == DOWN)
              vy = 0;
    }

    void mouseDragged()
    {
        PVector v = new PVector(mouseX-pmouseX, 
                                mouseY-pmouseY);
        v.normalize();
        vtheta = -.05 * v.x;
        vy = .8f * v.y;
  }

    void mouseReleased()
    {
                vtheta = 0f;
                vy = 0f;
    }

    void vrcoords()
    {
        // This helper function performs some coordinate transformations to
        // make the 3D space easier to think about: 
        // - origin is translated to center of screen 
        // - axes are scaled so that y-axis range is [-100, 100] 
        // - y-axis is flipped, so that positive == up

        translate(width/2, height/2);
        float maxY = 100;
        float scalingFactor = height/2 / maxY;
        scale(scalingFactor, -scalingFactor, scalingFactor);    
    }

    // cylindrical coordinates:
    //  - theta is angle in xz-plane, measured from positive z-axis, toward positive x-axis
    //  - y is height
    //  - vtheta and vy are velocities for smooth motion

     float theta = 0;
     float y = 0;

     float vtheta = 0;
     float vy = 0;
}



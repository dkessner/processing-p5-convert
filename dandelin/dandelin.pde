//
// DandelinSphereDemo.java
//
// Darren Kessner
// Marlborough School
//


//public class DandelinSphereDemo extends PApplet
//{
  
    void setup()
    {
        size(1000, 800, P3D);
        cylinderNavigator = new CylinderNavigator();
        dandelinSpheres = new DandelinSpheres();
    }

    void draw()
    {
        background(0);
        cylinderNavigator.update();

        pushMatrix();
        cylinderNavigator.transform();
        drawScene();
        popMatrix();

        //displayInstructions();
        //dandelinSpheres.displayVariables(50, 300);
    }

    void keyPressed()
    {
        if (key == 'q')
            dandelinSpheres.startPushingConeSlantAngle(.01);
        else if (key == 'a')
            dandelinSpheres.startPushingConeSlantAngle(-.01);
        else if (key == 'w')
            dandelinSpheres.startPushingR1(.1);
        else if (key == 's')
            dandelinSpheres.startPushingR1(-.1);
        else if (key == 'e')
            dandelinSpheres.startPushingR2(.1);
        else if (key == 'd')
            dandelinSpheres.startPushingR2(-.1);

        cylinderNavigator.keyPressed();
     }

    void keyReleased()
    {
        if (key == 'q' || key == 'a')
            dandelinSpheres.stopPushingConeSlantAngle();    
        else if (key == 'w' || key == 's')
            dandelinSpheres.stopPushingR1();    
        else if (key == 'e' || key == 'd')
            dandelinSpheres.stopPushingR2();    

        cylinderNavigator.keyReleased();
    }

    void mouseDragged()
    {
        cylinderNavigator.mouseDragged();
    }

    void mouseReleased()
    {
        cylinderNavigator.mouseReleased();
    }

    void drawScene()
    {
        cylinderNavigator.drawAxes();
        dandelinSpheres.display();
    }

    void displayInstructions()
    {
        fill(128);
        text("(x, y, z) <-> (red, green, blue)", 50, 25);
        text("positive y-axis is up", 50, 50);
        text("initial y range: [-100, 100]", 50, 75);

        text("Cylindrical coordinate camera navigation", 50, 125);
        text("  r fixed", 50, 150);
        text("  theta: left/right", 50, 175);
        text("  z: up/down", 50, 200);
    }

    CylinderNavigator cylinderNavigator;
    DandelinSpheres dandelinSpheres;

    /*
    public static void main(String[] args)
    {
        PApplet.main("DandelinSphereDemo");
    }
    */
//}

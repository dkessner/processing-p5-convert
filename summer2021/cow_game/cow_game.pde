




PImage cow;
PImage farm;

float score;
float buttonY;
float buttonX;
float r;
boolean pressed = false;

Ball ball;
Ball ball2;
Ball ball3;
Ball ball4;
Ball ball5;
Ball ball6;
Ball ball7;
Ball ball8;
Ball ball9;
Ball ball10;

int state = 0;


void setup()
{
  size(600,600);
  noCursor();

 cow = loadImage("cow.jpg");
 cow.resize(100,100);

  farm = loadImage("farm.jpg");
  farm.resize(width,height);
  
  score=0;

  // create the Ball object and set variables
  ball = new Ball();
  ball.x = 200;
  ball.y = 200;
  ball.vx = 1;
  ball.vy = 2;
  
  // create another Ball object and set variables
  ball2 = new Ball();
  ball2.x = 200;
  ball2.y = 200;
  ball2.vx = 2;
  ball2.vy = 1;
  
   // create another Ball object and set variables
  ball3 = new Ball();
  ball3.x = 200;
  ball3.y = 200;
  ball3.vx = 3;
  ball3.vy = 4;
  
  // create another Ball object and set variables
  ball4 = new Ball();
  ball4.x = 200;
  ball4.y = 200;
  ball4.vx = 4;
  ball4.vy = 3;
  
  // create another Ball object and set variables
  ball5 = new Ball();
  ball5.x = 200;
  ball5.y = 200;
  ball5.vx = 6;
  ball5.vy = 5;
  
   // create the Ball object and set variables
  ball6 = new Ball();
  ball6.x = 200;
  ball6.y = 200;
  ball6.vx = 5;
  ball6.vy = 6;
  
    // create the Ball object and set variables
  ball7 = new Ball();
  ball7.x = 200;
  ball7.y = 200;
  ball7.vx = 7;
  ball7.vy = 8;
  
    // create the Ball object and set variables
  ball8 = new Ball();
  ball8.x = 200;
  ball8.y = 200;
  ball8.vx = 8;
  ball8.vy = 7;
  
    // create the Ball object and set variables
  ball9 = new Ball();
  ball9.x = 200;
  ball9.y = 200;
  ball9.vx = 7;
  ball9.vy = 8;
  
    // create the Ball object and set variables
  ball10 = new Ball();
  ball10.x = 200;
  ball10.y = 200;
  ball10.vx = 9;
  ball10.vy = 10;
  
}
  



void draw()

{
 background(255);
 
 if (state == 0)
   drawStart();
 else if (state == 1)
   drawGame();
 else 
   drawEnd();
  


}

void drawStart()
{
  background(0);
  image(farm, 0, 0);
  text ("TRY TO COLLECT THE GRASS TO FEED YOUR HUNGRY COW!!", width/4, height/5);
   text ("click 1 to start", width/4, height/4);
  fill(0,0,10);
  
}


 void drawGame()
 {
   imageMode(CENTER);
   image(cow, mouseX, mouseY);
   
   text(score,50,50);



  
   
   
  // display both balls
  ball.display();
  ball2.display();
  ball3.display();
  ball4.display();
  ball5.display();
  ball6.display();
  ball7.display();
  ball8.display();
  ball9.display();
  ball10.display();
  
  if(score>=1000)
    state=2;
  
  
 }

void drawEnd()
{
   fill(255,0,0);
   text("GAME OVER! GOOD JOB YOU FED THE COW.", width/2, height/2);
}

void keyPressed()
{
  if (state == 0)
  state = 1;
  
 
  
}

  void mousePressed()
  {
    if (dist(buttonX, buttonY, mouseX, mouseY) < r)
  {
    if (pressed == true)
    {
      pressed = false;
      
      score += 1000;
      buttonX = random(r, width-r);
      buttonY = random(r, height-r);
    }
    else
    {
      pressed = true;
        }
     }
  }

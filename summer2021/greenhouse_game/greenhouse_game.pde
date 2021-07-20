


PImage greenhouse;

PImage plant;

int state = 0;

float playerX = 300;
float playerY = 525;

int score = 0;

ArrayList<Raindrop> raindrops;

void setup()
{
  size(600, 600);
  
  greenhouse = loadImage("greenhouse.png");
  greenhouse.resize(600, 600);
  
  plant = loadImage("plant.png");
  plant.resize(75, 75);
  
  raindrops = new ArrayList<Raindrop>();
  
  for (int i=0; i<7; i++)
  {
    Raindrop r = new Raindrop();
    raindrops.add(r);
    
  }
  
}

void draw()
{
  background(255);
  
 
  
  if(state ==0)
    drawStart();
  else if (state == 1)
    drawGame();
  else 
    drawEnd();
    
  
  
}

void drawStart()
{
  background(#28853d); //dark green
  fill(255);
  text("welcome to the greenhouse. click space 2 start", 150, 300);
  textSize(13);
  text("goals: collect as many raindrops as u can and DON'T GET HIT BY PESTISIDES!", 75, 400);
  
}

void drawGame()
{
  background(255);
  imageMode(CORNER);
  image(greenhouse, 0, 0);
  imageMode(CENTER);
  image(plant, playerX, playerY);
  
  fill(0);
  
  text("score: " + score, 13, 30);
  textSize(24);
  
  for(Raindrop r: raindrops)
  r.display();
}

void drawEnd()
{
  
}

void keyPressed()
{
  if (state == 0)
    state = 1;
    
  else if (state == 1)
  {
    
   if(keyCode == LEFT)
   {
     playerX += -7;
   }
 
 
   else if(keyCode == RIGHT)
   {
     playerX += 7;
     
   }
 
   else if(keyCode == UP)
   {
     playerX += 7;
   }
 
   else if(keyCode == DOWN)
 
   {
     playerX += -7;
   }
  }
   else if(state == 2)
    state = 0;
 }
  
    
 
  

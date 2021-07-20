

PImage dino;
PImage rock;
PImage dinofood;
PImage coinbag;
PImage coin;
PImage bluedino;
PImage finish;
PImage start;
PImage arrow;
PImage start1;
PImage fire;

float rockX;
float rockY;

float playerdinoA;
float playerdinoB;

float leafX;
float leafY;

float fireX;
float fireY;

float bluedinoX;
float bluedinoY;

float finishX;
float finishY;

float arrowX;
float arrowY;
float arrowVX;
float arrowVY;

int alarm = 0;

PFont baskerville;

int state = 0;
int score = 0;

ArrayList<Coin> coins;

void setup ()
{
  size (600, 600);
  
  baskerville = createFont("Baskerville-BoldItalic", 20);
  
  imageMode (CENTER);
  dino = loadImage ("dino.png");
  dino.resize(200, 200);
  
  dinofood = loadImage ("dinofood.png");
  
  rock = loadImage ("rock.png");
  rock.resize(200, 100);
  
  coin = loadImage ("coin.png");
  coin.resize (50, 50);
 
  coinbag = loadImage ("coin bag.png");
  coinbag.resize (150, 230);
  
  bluedino = loadImage ("bluedino.png");
  bluedino.resize (100, 110);
  
  finish = loadImage ("finish.png");
  finish.resize (100, 160);
  
  fire = loadImage ("fire.png");
  
  arrow = loadImage ("arrow.png");
  arrow.resize (50, 100);
  
  start1 = loadImage ("start1.png");
  
  initialize ();
}

void initialize()
{
   playerdinoA = 100;
  playerdinoB = 100;
  
  rockX = 500;
  rockY = 100;
  
  leafX = 100;
  leafY = 100;
  
  bluedinoX = 100;
  bluedinoY = 100;
  
  finishX = playerdinoA + 400;
  finishY = playerdinoB + 400;
  
  arrowX = random (50, 400);
  arrowY = random (50, 400);
  arrowVX = random (1, 4);
  arrowVY = random (1, 4);
  
  
  coins = new ArrayList <Coin>();
  
  for (int i=0; i<18; i++)
    coins.add(new Coin());
    
    score = 0;
}

//stages
void draw ()
{
  background (#61C9F7);
  
  if (state == 0)
  drawStart ();
  else if (state ==1)
  drawGame1 ();
  else if (state ==2)
  drawGame2 ();
  else if (state ==3)
  drawGame3 ();
  else drawEnd();
}
  //game title screen
 void drawStart()
 {
   fill(#3AF502);
  textFont(baskerville, 30);
   text ("Dino Game", 260, 300);
   fill (#F72073);
   textFont(baskerville, 20);
   text ("Press Any Key to Begin", 240, 330);
   
 }
 
 void drawGame1() //state 1
 {
    background (#AEFAB4); //green
    
    text ("LEVEL ONE", 250, 70);
    text ("Get the Dino to the Leafs without", 40, 500);
    text(" letting the Meteorite hit them", 40 , 530);
    
    image (dinofood, leafX, leafY);
    leafX = 500;
    leafY = 500;
    //dino eats leaf code
    
    if (dist(playerdinoA, playerdinoB, leafX, leafY) < 100)
    {
      state = 2;
      
      playerdinoA = 100;
      playerdinoB = 100;
    }
    
    image(dino, playerdinoA, playerdinoB);
  
    //collison code
   if (dist(playerdinoA, playerdinoB, rockX, rockY) < 90)
   {
       fireX = playerdinoA;
       fireY = playerdinoB;
       
       alarm = millis() + 1500;
   }
     if (millis() < alarm)
    { 
     image (fire, fireX, fireY);
      
     playerdinoA = 90;
     playerdinoB = 90;
     
     rockX = 500;
     rockY = 30;
    }
   
  
    image (rock, rockX, rockY);
    rockX = rockX-2.3;
    rockY = rockY+2.3;
    
    if (rockX > width-70)
    {
      rockX = 500;
      rockY = 30;
    }
    
    if (rockY > height-70)
    {
      rockX = 500;
      rockY = 30;
    }
 }
 
 void drawGame2() //state 2
 {
   background (#FACCF2); //pink
   fill(#6C5ECE);
  textFont(baskerville);
   text ("LEVEL TWO", 250, 70);
   text ("Collect 15 Coins to Advance!", 100, 500);
   text ("score:" + score, 20, 20);
   image (coinbag, 450, 450);
   image (dino, playerdinoA, playerdinoB);
   
   for (Coin coin : coins)
   coin.display();
   
   if (score >= 15)
   {
     state = 3;
     playerdinoA = 100;
     playerdinoB = 100;
   }
 }
 
 void drawGame3() //state 3
 {
   
   background (#B2C8FF); //blue
   
   fill (#A2EA8E);
   text ("LEVEL THREE", 250, 70);
   image (finish, finishX, finishY);
   image (start1, 100, 100);
  text ("Avoid the Arrows and get to the Trophy!", 100, 500);
   image (dino, playerdinoA, playerdinoB);
   
   image (bluedino, playerdinoA-bluedinoX, playerdinoB-bluedinoY);
   image (arrow, arrowX, arrowY);
   
   arrowX += arrowVX;
   arrowY += arrowVY;
   
   if (arrowX < 0 || arrowX>width-50)
     arrowVX *= -1;
     
   if (arrowY < 0 || arrowY>height-50)
     arrowVY *= -1;
     
   if (dist(playerdinoA, playerdinoB, arrowX, arrowY) < 100)
   {
     playerdinoA = 100;
     playerdinoB = 100;
   }
   
   if (dist(playerdinoA, playerdinoB, finishX, finishY) < 100)
   {
     drawEnd();
     arrowVY = 0;
     arrowVX = 0;
   }
  
 }
 
 void drawEnd() //?
 {
   background (#C9FFB9); //red
   fill (#FF525E);
   text ("You Won! Hit P to Play Again", 150, 300);
 }

 //movements between stages
 void keyPressed()
 {
 {
   if (state == 0)
   state = 1;
   
 }
 {
   if (keyCode == ('R'))
   {
     playerdinoA = 100;
     playerdinoB = 100;
   }
 }
 {
   if (keyCode == ('P'))
   {
     state = 0;
     
     initialize();
   }
 if (keyCode == RIGHT)
  {
    playerdinoA += 10;
  }
 else if (keyCode == LEFT)
  {
    playerdinoA += -10;
  }
  else if (keyCode == UP)
  {
    playerdinoB += -10;
  }
  else if(keyCode == DOWN)
   {
    playerdinoB += 10;
   }
  else if(keyCode == ('S'))
  {
    if (state == 0)
   state = 1;
   
   else if (state ==1)
   state = 2;
   
   else if (state ==2)
   state = 3;
   
   else if (state ==3)
   state = 4;
  }
 }
 }

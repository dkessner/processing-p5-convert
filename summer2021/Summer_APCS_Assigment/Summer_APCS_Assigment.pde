PImage Sam;
PImage landscape;
PImage slide;

String gameState = "START";

int score = 0;
int state = 0;
int player = 0;

PFont game;
PFont fancy;

Sally sally;

import processing.sound.*;
SoundFile dance;
SoundFile jump;

ArrayList<Slides> slides;
Lava lava;
Solid solid;

void setup()
{
  size(600, 600);
  noCursor();

  dance = new SoundFile(this, "dance.mp3");
  dance.loop();

  jump = new SoundFile(this, "jump.wav");

  Sam = loadImage("sally.png");
  Sam.resize(50, 75);

  landscape = loadImage("lava.jpg");
  landscape.resize(600, 600);

  slide = loadImage("slide.png");
  slide.resize(100, 150);

  textSize(30);
  textAlign(CENTER);

  game = createFont("game.otf", 15);
  fancy = createFont("Snow.otf", 48);


  slides = new ArrayList<Slides>();
  for (int i = 0; i < 10; i++)
  {
    Slides b = new Slides();
    slides.add(b);
  }

  lava = new Lava(0, 450, width, height, 0.2);
  solid = new Solid(100, 335, 430, 50);
  sally = new Sally();
}

void draw()
{
  background(255);
  imageMode(CENTER);

  if (gameState == "START") {
    drawStart();
  } else if (gameState == "GAME") {
    drawGame();
  } else if (gameState == "END") {
    drawEnd();
  }
}

void keyPressed()
{
  if (gameState == "START") {
    gameState = "GAME";
  } else if (gameState == "END") {
    resetGame();
    gameState = "START";
  }
  if (keyCode == UP)
  {
    sally.jump();
  }
}

void resetGame()
{
  score = 0;

  sally.x = 150;
  sally.y = 300;
  
  /*
  slides.a = 530;
  slides.b = 400;
  */
}

void drawStart()
{
  background(#F70707);
  fill(#FFB936);
  textFont(game);
  text("Welcome to HOT LAVA MONSTER!", width/2, height/2);
  textFont(fancy);
  text("Press a key to start...", width/2, height/2+50);
}
void drawGame()
{
  image(landscape, 300, 300);

  fill(0);
  textSize(15);
  textFont(game);
  text("Get 5000 points to win!", width/2, height/2-270);
  text("DONT TRIP ON THE SLIDE & FALL IN LAVA", width/2, height/2-250);
  textSize(20);
  text("Score: " + score, width/2+20, height/2-220);

  lava.display();
  solid.display();

  for (Slides r : slides)
  {
    r.updatePosition();
    r.checkEdges();
    r.display();
  }
  sally.display();

  if (sally.y>height+100)
  {
    score = -1000;
  }

  if (score == -1000)
  {
    gameState = "END";
  } else if (score == 5000)
    gameState = "END";
}

void drawEnd()
{
  if (score == 5000) {
    background(#29FF35);
    fill(#FFFFFF);
    textFont(game);
    text("You won!", width/2, height/2);
    textFont(fancy);
    text("Press a key to start again", width/2, height/2+50);
  }
  if (score == -1000) {
    background(#FF2946);
    fill(#FFFFFF);
    textFont(game);
    text("Try again :(", width/2, height/2);
    textFont(fancy);
    text("Press a key to restart", width/2, height/2+50);
  }
}

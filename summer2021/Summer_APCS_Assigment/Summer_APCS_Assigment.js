
class ArrayList extends Array {
    constructor() {super(...[]);}
    size() {return this.length;}
    add(x) {this.push(x);}
    get(i) {return this[i];}
    remove(i) {this.splice(i,1);}
}

 class Lava {
     a; b; w; h; c;
     constructor(aIn, bIn, wIn, hIn, cIn) {
         this.a = aIn;
         this.b = bIn;
         this.w = wIn;
         this.h = hIn;
         this.c = cIn;
     }
     display() {
         rectMode(CORNER);
         noStroke();
         fill("#FF5517");
         rect(this.a, this.b, this.w, this.h);
     }
 }
 class Sally {
     x; y; vy; ay;
     constructor() {
         this.y = int(300);
         this.vy = int(0);
         this.ay = 0.35;
         this.x = int(150);
     }
     jump() {
         this.vy = -8;
     }
     collision() {
         if (player == 1) {
             this.vy = 6;
         }
     }
     display() {
         image(Sam, this.x, this.y);
         this.y += this.vy;
         this.vy += this.ay;
         if (this.y > 300) {
             if (player == 0) {
                 this.y = 300;
                 this.vy = 0;
             }
             if (player == 1) {
                 this.vy = 7;
             }
         }
         this.collision();
     }
 }
 class Slides {
     a; b; va; vb;
     constructor(aIn, bIn, vaIn, vbIn) {
         this.a = aIn;
         this.b = bIn;
         this.va = vaIn;
         this.vb = vbIn;
     }
     /*
     constructor() {
         this.a = int(530);
         this.b = int(400);
         this.va = int(2);
         this.vb = int(0);
     }
     */
     updatePosition() {
         if (player == 0) {
             this.a += this.va;
             this.b += this.vb;
             this.a = this.a - 7;
         } else if (player == 1) {
             this.a = 150;
         }
     }
     checkEdges() {
         if (this.a > width || this.a < 0) {
             this.a = int(530);
             image(slide, this.a, this.b);
             score += 100;
         }
         if (dist(sally.x, sally.y, this.a, this.b) < 105) {
             player = 1;
         }
     }
     display() {
         image(slide, this.a, this.b);
         this.updatePosition();
         this.checkEdges();
     }
 }
 class Solid {
     a; b; w; h;
     constructor(aIn, bIn, wIn, hIn) {
         this.a = aIn;
         this.b = bIn;
         this.w = wIn;
         this.h = hIn;
     }
     display() {
         rectMode(CORNER);
         noStroke();
         fill(random(255), random(255), random(255));
         rect(this.a, this.b, this.w, this.h);
     }
 }
 let Sam;
 let landscape;
 let slide;
 let gameState = "START";
 let score = 0;
 let state = 0;
 let player = 0;
 let game;
 let fancy;
 let sally;
 let dance;
 let jump;
 let slides;
 let lava;
 let solid;

 function setup() {
     createCanvas(600, 600);
     noCursor();
     dance.loop();
     Sam.resize(50, 75);
     landscape.resize(600, 600);
     slide.resize(100, 150);
     textSize(30);
     textAlign(CENTER);
     slides = new ArrayList();
     for (let i = 0; i < 10; i++) {
         let b = new Slides();
         slides.add(b);
     }
     lava = new Lava(0, 450, width, height, 0.2);
     solid = new Solid(100, 335, 430, 50);
     sally = new Sally();
 }

 function preload() {
     dance = loadSound("data/dance.mp3");
     jump = loadSound("data/jump.wav");
     Sam = loadImage("data/sally.png");
     landscape = loadImage("data/lava.jpg");
     slide = loadImage("data/slide.png");
     game = loadFont("data/game.otf");
     fancy = loadFont("data/Snow.otf");
 }

 function draw() {
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

 function keyPressed() {
     if (gameState == "START") {
         gameState = "GAME";
     } else if (gameState == "END") {
         resetGame();
         gameState = "START";
     }
     if (keyCode == UP_ARROW) {
         sally.jump();
     }
 }

 function resetGame() {
     score = 0;
     sally.x = 150;
     sally.y = 300;
 }

 function drawStart() {
     background("#F70707");
     fill("#FFB936");
     textFont(game);
     text("Welcome to HOT LAVA MONSTER!", width / 2, height / 2);
     textFont(fancy);
     text("Press a key to start...", width / 2, height / 2 + 50);
 }

 function drawGame() {
     image(landscape, 300, 300);
     fill(0);
     textSize(15);
     textFont(game);
     text("Get 5000 points to win!", width / 2, height / 2 - 270);
     text("DONT TRIP ON THE SLIDE & FALL IN LAVA", width / 2, height / 2 - 250);
     textSize(20);
     text("Score: " + score, width / 2 + 20, height / 2 - 220);
     lava.display();
     solid.display();
     for (let r of slides) {
         r.updatePosition();
         r.checkEdges();
         r.display();
     }
     sally.display();
     if (sally.y > height + 100) {
         score = -1000;
     }
     if (score == -1000) {
         gameState = "END";
     } else if (score == 5000) gameState = "END";
 }

 function drawEnd() {
     if (score == 5000) {
         background("#29FF35");
         fill("#FFFFFF");
         textFont(game);
         text("You won!", width / 2, height / 2);
         textFont(fancy);
         text("Press a key to start again", width / 2, height / 2 + 50);
     }
     if (score == -1000) {
         background("#FF2946");
         fill("#FFFFFF");
         textFont(game);
         text("Try again :(", width / 2, height / 2);
         textFont(fancy);
         text("Press a key to restart", width / 2, height / 2 + 50);
     }
 }

//
// cat
//
let cat;
let mouse;
let mouse_x, mouse_y;
function setup() {
    createCanvas(400, 400);
    noCursor();
    cat.resize(100, 100);
    mouse.resize(50, 50);
    moveMouse();
}
function preload() {
    cat = loadImage("cat.png");
    mouse = loadImage("mouse.png");
}
function moveMouse() {
    mouse_x = random(50, width - 50);
    mouse_y = random(50, height - 50);
}
function draw() {
    background(100);
    imageMode(CENTER);
    image(cat, mouseX, mouseY);
    image(mouse, mouse_x, mouse_y);
    if (dist(mouseX, mouseY, mouse_x, mouse_y) < 50) moveMouse();
}


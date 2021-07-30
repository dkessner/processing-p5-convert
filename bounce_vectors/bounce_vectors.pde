//
// bounce_vectors.pde
//


PVector position = new PVector(100, 100);
PVector velocity = new PVector(5, 3);


void setup()
{
    size(400, 400);
}


void draw()
{
    background(0);
    fill(0, 0, 255);
    ellipse(position.x, position.y, 100, 100);

    position.add(velocity);

    if (position.x < 50 || position.x > width-50)
        velocity.x *= -1;

    if (position.y < 50 || position.y > height-50)
        velocity.y *= -1;
}





class Coin
{
float coinX;
float coinY;


Coin ()
{
 
  
  
  coinX = random (50, 400);
  coinY = random (50, 400);
}
void display()
{
image (coin, coinX, coinY);
if (dist(playerdinoA, playerdinoB, coinX, coinY) < 60)
   {
     coinX = width+10000;
     coinY = height+10000;
     
    score += 1;
   }
}
}

//
// grid
//



private final int n = 0x29a;

int[] dummy = {1, 2, 3, 4};
int[] dummy2 = new int[5];

int[][] numbers = { {1, 2, 3, 4}, 
                   {5, 6, 7, 8}, 
                   {9, 10, 11, 12}, 
                   {13, 14, 15, 16} };

int[][] numbers2 = new int[2][3];

void setup()
{
    size(400, 400);

    initializeArray(numbers2);
    printArray(numbers2);
    println("computeSum: " + computeSum(numbers2));
    println("computeSum2: " + computeSum2(numbers2));
}

void initializeArray(int[][] values)
{
    int value = 1;
    for (int i=0; i<values.length; i++)
    for (int j=0; j<values[i].length; j++)
        values[i][j] = value++;
}


void printArray(int[][] values)
{
    for (int[] row : values)
    {
        for (int value : row)
            print(value + " ");
        println();
    }
}


int drawFace(int x, int y)
{
   fill(255);
   ellipse((float)x, y, 100, 100);
   fill(0);

   pushMatrix();
     translate(-25, -10);
     ellipse(x, y, 20, 20);
   popMatrix();
   
   pushMatrix();
     translate(25, -10);
     ellipse(x, y, 20, 20);
   popMatrix();

   ellipse(x, y+25, 40, 20);

   final int result = 0;
   return result;
}


int computeSum(int[][] numbers)
{
    int total = 0;
    for (int[] row : numbers)
    for (int number : row)
        total += number;
    return total;
}

int computeSum2(int[][] numbers)
{
    int total = 0;
    for (int i=0; i<numbers.length; i++)
    for (int j=0; j<numbers[i].length; j++)
        total += numbers[i][j];
    return total;
}

void draw()
{
    background(0);
    textSize(20);
    textAlign(CENTER, CENTER);

  	for (int i=0; i<4; i++)
    {
        for (int j=0; j<4; j++)
        {
            fill( (i+j)%2 * 255 );
            rect(j*100, i*100, 100, 100);
            fill( (i+j+1)%2 * 255 );
            text(numbers[i][j], j*100+50, i*100+50);
        }
    }

    int k = 0;
    while (k < 4)
    {
        drawFace(k*100+50, k*100+50);
        k++;
    }

    do 
    {
        fill(255*(k+1)/4);
        rect(k*100, (3-k)*100, 100, 100);

        switch (k)
        {
            case 0:
              fill(255, 0, 0);
              break;
            case 1:
              fill(0, 255, 0);
              break;
            case 2:
              fill(0, 0, 255);
              break;
            case 3:
              fill(255, 0, 255);
              break;
        }
        rect(k*100+25, (3-k)*100+25, 50, 50);

    } while (k-- > 0);

  	for (int i=0; i<4; i++)
    for (int j=0; j<4; j++)
    {
        fill(255, 0, 0);
        text(numbers[i][j], j*100+50, i*100+50);
    }
}



void setup()
{
    size(800,600);
    stroke(255);
    frameRate(24);
}
float y = 100;

void draw()
{
    background(0);
    y = y - 1
    if (y < 0)
    { y = height }
    line(0,y,width,y);
}
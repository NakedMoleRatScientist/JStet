void setup()
{
  size(800,600);
  stroke(255);
  frameRate(24);
}
float y = 100;
var lshape = new Tetromino();
lshape.modify_block(0,0,1);
var drawShape = new TetrominoDraw();
drawShape.create_blocks(lshape.get_list());

void draw()
{
  background(0);
  y = y - 1
  if (y < 0)
  { y = height }
  line(0,y,width,y);
}
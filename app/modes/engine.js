
void setup()
{
  size(800,600);
  stroke(255);
  frameRate(24);
}

var lshape = new Tetromino();
lshape.modify_block(0,0,1);
lshape.modify_block(1,0,1);
lshape.modify_block(2,0,1);
lshape.modify_block(2,1,1);
var drawShape = new TetrominoDraw();

void draw()
{
  background(0,0,0);
  drawShape.create_blocks(lshape.get_list());
}
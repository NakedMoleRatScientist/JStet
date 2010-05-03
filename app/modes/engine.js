
void setup()
{
  size(800,600);
  stroke(255);
  frameRate(24);
}

var lshape = new Tetromino();
lshape.modify_block(0,0,1);
lshape.modify_block(0,1,1);
lshape.modify_block(0,2,1);
lshape.modify_block(1,2,1);
var drawShape = new TetrominoDraw();

void draw()
{
  background(0,0,0);
  drawShape.create_blocks(lshape.get_list(),lshape.x,lshape.y);
}

void mousePressed()
{
    lshape.rotate();
}

void keyPressed()
{
    if (key == 100)
    {
	lshape.move(20,0);
    }
    elseif (key ==115)
    {
	lshape.move(0,20);
    }
}
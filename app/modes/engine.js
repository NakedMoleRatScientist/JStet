
void setup()
{
  size(800,600);
  stroke(255);
  frameRate(24);
}

var generator = new ShapeGenerator();
var shape = new Tetromino();
shape.modify_block(0,0,1);
shape.modify_block(0,1,1);
shape.modify_block(0,2,1);
shape.modify_block(1,2,1);
var drawShape = new TetrominoDraw();

void draw()
{
  background(0,0,0);
  drawShape.create_blocks(shape.get_list(),shape.x,shape.y);
}

void keyPressed()
{
    switch(key)
    {
    case 100:
        shape.move(20,0);
        break;
    case 115:
        shape.move(0,20);
        break;
    case 97:
        shape.move(-20,0);
        break;
    case 119:
        shape.rotate();
        break;
    default:
	console.log(key);
	break;
    }
}
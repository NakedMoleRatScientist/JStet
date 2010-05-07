
void setup()
{
  size(800,600);
  stroke(255);
  frameRate(24);
}

var generator = new ShapeGenerator();
var shape = new Tetromino();
shape.change_shape(generator.getShape());
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
    case 101:
      generator.current = generator.getShape();
      shape.blocks = shape.create_blocks();
      shape.modify_bulk(generator.current.get_data(0));
      break;
    default:
      console.log(key);
      break;
    }
}

void setup()
{
  size(800,600);
  stroke(255);
  frameRate(24);
}

var generator = new ShapeGenerator();
var shape = new Tetromino();
shape.change_shape(generator.current);
var field = new PlayField();
var drawShape = new TetrominoDraw();
var drawField = new PlayFieldDraw();
var timer = new TimerAction();

function cleanEvent()
{
  shape.return_to_normal();
  generator.current = generator.getShape();
  shape.change_shape(generator.current);
}
void draw()
{
  if (timer.react())
  {
    if (shape.move(0,20) == 2)
    {
      field.insert_blocks(shape.blocks,shape.x,shape.y)
      cleanEvent();
    }
  }
  
  background(0,0,0);
  stroke(205,201,201);
  fill(0,0,0);
  rect(drawField.x,drawField.y,drawField.width,drawField.height)
  stroke(255,255,255);
  fill(255,255,255);
  drawShape.create_blocks(shape.get_list(),shape.x,shape.y);
  drawShape.draw_field(field.field);
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
      shape.change_shape(generator.current);
      break;
    default:
      console.log(key);
      break;
    }
}
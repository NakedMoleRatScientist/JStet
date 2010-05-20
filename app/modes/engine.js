
void setup()
{
  size(800,600);
  stroke(255);
  PFont font= loadFont("monospace");
  textFont(font,18);
  frameRate(24);
}
var status = true;
var generator = new ShapeGenerator();
var shape = new Tetromino();
shape.change_shape(generator.current);
var future = new Tetromino();
generator.getShape();
future.change_shape(generator.current);
var field = new PlayField();
var drawShape = new TetrominoDraw();
var drawField = new PlayFieldDraw();
var timer = new TimerAction();
var score = new Score();
function cleanEvent()
{
  shape.return_to_normal();
  shape.change_shape(generator.current);
  generator.current = generator.getShape();
  future.change_shape(generator.current);
}

function checkEvent(x,y)
{
  var offset = field.calculate_positions(shape.x,shape.y);
  if (field.check(field.get_list(shape.blocks),offset[0],offset[1]) == false)  
  {
    shape.move(x,y);
    return true;
  }
  return false;
}

function downEvent()
{
  if (checkEvent(0,-20))
  {
    if (shape.y == 0)
    {
      console.log("FAIL!");
    }
    insertEvent();
  }
}

function insertEvent()
{
  field.insert_blocks(shape.blocks,shape.x,shape.y);
  cleanEvent();
  while (field.move_lines(field.clear_line(field.check_field())))
  {
    score.increase();
  }
}

void draw()
{
  if (timer.react())
  { 
    if (shape.move(0,20) == 2)
    {
      insertEvent();
    }
    downEvent();
  }
  
  background(0,0,0);
  stroke(205,201,201);
  fill(0,0,0);
  rect(drawField.x,drawField.y,drawField.width,drawField.height)
  stroke(255,255,255);
  fill(255,255,255);
  drawShape.create_blocks(shape.get_list(),shape.x,shape.y);
  text("Current: ",300,135);
  drawShape.create_blocks(shape.get_list(),250,100);
  text("Next: ", 300,250);
 drawShape.create_blocks(future.get_list(),250,210);
  text(score.toString(),300,50);
  drawShape.draw_field(field.field);
}

void keyPressed()
{
    switch(key)
    {
    case 100:
      shape.move(20,0);
      checkEvent(-20,0);
      break;
    case 115:
      shape.move(0,20);
      downEvent();
      break;
    case 97:
      shape.move(-20,0);
      checkEvent(20,0);
      break;
    case 119:
      shape.rotate();
      if (checkEvent(0,0))
      {
        shape.rotate_backward();
      }
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
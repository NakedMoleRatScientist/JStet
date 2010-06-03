
void setup()
{
  size(800,600);
  stroke(255);
  PFont font= loadFont("monospace");
  textFont(font,18);
  frameRate(24);
}
var mode = new Mode();
var network = new ScoreNetwork();
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
      mode.change(1);
      score.send();
    }
    insertEvent();
  }
}

function insertEvent()
{
  field.insert_blocks(shape.blocks,shape.x,shape.y,shape.shape.color);
  cleanEvent();
  while (field.move_lines(field.clear_line(field.check_field())))
  {
    score.increase();
  }
}

void drawInstruction()
{
  text("Instruction: ",450,50);
  text("a - left",450,80);
  text("s - down",450,100);
  text("d - right",450,120);
  text("w - rotate",450,140);
}

void draw()
{
  if (mode.status == 0)
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
    drawShape.create_blocks(shape.get_list(),shape.x,shape.y,shape.shape.color);
    text("Current: ",300,135);
    current = new Tetromino();
    current.change_shape(shape.shape);
    drawShape.create_blocks(current.get_list(),250,100,current.shape.color);
    text("Next: ", 300,250);
    drawShape.create_blocks(future.get_list(),250,210,future.shape.color);
    text(score.toString(),300,50);
    drawInstruction();
    drawShape.draw_field(field.field);
  }
  else if(mode.status == 1)
  {
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,35);
    text("GAME OVER",300,300);
    textFont(font,18);
    text("Press n to start a new game.",250,325);
  }
  else if(mode.status == 2)
  {
    background(0,0,0)
    PFont font = loadFont("monospace");
    textFont(font,35);
    text("HIGH SCORE LIST",300,0);
  }
}
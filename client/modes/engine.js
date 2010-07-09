
function Engine(protocol)
{
  var self = this;
  var protocol = protocol;
  protocol.engine = self;
  self.current = new Tetromino();
  self.future = new Tetromino();
  self.field = new Playfield();
  self.write_shape = function(name,choice,type)
  {
    if (type == 0)
    {
      self.current.change_shape(getShape(name));
      self.current.choice = choice;
      self.current.update_shape();
      self.current.draw = true;
    }
    else if (type == 1)
    {
      self.future.change_shape(getShape(name));
      self.future.choice = choice;
      self.future.update_shape();
      self.future.draw = true;
    }
  };
  self.move = function(x,y)
  {
    self.current.x = x;
    self.current.y = y;
  };
};


void setup()
{
  size(800,600);
  stroke(255);
  PFont font= loadFont("monospace");
  textFont(font,18);
  frameRate(24);
}
var mode = new Mode();
var score = new Score();
var shape = new Tetromino();
var current = new Tetromino();
var future = new Tetromino();
var field = new PlayField();
var drawShape = new TetrominoDraw();
var drawField = new PlayFieldDraw();
var timer = new TimerAction();
var board = new ScoreBoard(score);
var score_data = new HighScore();
var network = new Net(score);
var over = new GameOver();
var title = new TitleScreen();
network.initialize();
score.enableNetwork(network);
var game_protocol = new GameProtocol(network);
timer.addAction("network",60);
var engine = new Engine(game_protocol);

function cleanEvent()
{
  shape.return_to_normal();
  shape.change_shape(generator.current);
  generator.current = generator.getShape();
  future.change_shape(generator.current);
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

//Workaround for HTTP connections being droped after two minutes. Tried many settings to keep the connection alive to no avail. However, constant sending every minute does seem to keep the connection alive. This bug may not affect machines outside of the original's developer.


void gameDisplay()
{
  background(0,0,0);
  stroke(205,201,201);
  fill(0,0,0);
  rect(drawField.x,drawField.y,drawField.width,drawField.height)
  stroke(255,255,255);
  fill(255,255,255);
  if (engine.current.draw == true)
  {
    drawShape.create_blocks(engine.current.get_list(),engine.current.x,engine.current.y,engine.current.shape.color);
    text("Current: ",300,135);
    drawShape.create_blocks(engine.current.get_list(),250,100,engine.current.shape.color);
  }
  text("Next: ", 300,250);
  if (engine.future.draw == true)
  {
    drawShape.create_blocks(engine.future.get_list(),250,210,engine.future.shape.color);
  }
  text(score.toString(),300,50);
  drawInstruction();
  drawShape.draw_field(field.field);
}

void sendAlive()
{
  if (timer.getEvent() == "network")
  {
    network.sendAlive();
  }
}

void draw()
{
  timer.react();
  sendAlive();
  switch(mode.status)
  {
  case 0:
    title.display();
    break;
  case 4:
    gameDisplay();
    break;
  case 1:
    over.display();
    break;
  case 2:
    board.display();
    break;
  case 3:
    score_data.display();
    break;
  }
}
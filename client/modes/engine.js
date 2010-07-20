
function Engine(protocol,mode)
{
  var self = this;
  self.protocol = protocol;
  self.mode = mode;
  protocol.engine = self;
  self.current = new Tetromino();
  self.future = new Tetromino();
  self.field = new PlayField();
  self.score = 0;
  self.write_shape = function(name,choice,type)
  {
    if (type == 0)
    {
      if (self.current.shape != null)
      {
        self.field.insert_blocks(self.current.get_list(),self.current.x,self.current.y,self.current.shape.color);
      }
      self.current.return_to_zero();
      self.current.change_shape(getShape(name));
      self.current.draw = true;
    }
    else if (type == 1)
    {
      self.future.change_shape(getShape(name));
      self.future.choice = choice;
      self.future.update_shape();
      self.future.draw = true;
      self.change == false;
    }
    
  };
  //Update location.
  self.update_location = function(x,y)
  {
    self.current.x = x;
    self.current.y = y;
  };
  self.move = function(x,y)
  {
    self.current.move(x,y)
    var offset = self.field.calculate_positions(self.current.x,self.current.y);
    if (self.field.check(self.current.get_list(),offset[0],offset[1]) == false)
    {
      self.current.move(-x,-y);
    }
  };
  self.rotate = function(choice)
  {
    self.current.rotate(choice);
  };
  self.line_action = function(line)
  {
    self.field.move_lines(self.field.clear_line(line));
  };
  self.stop = function()
  {
    console.log("Game over");
    self.mode.change(1);
  };
  self.high_score = function()
  {
    console.log("High score, detected!");
    self.mode.change(3);
  };
  self.start = function()
  {
    self.current = new Tetromino();
    self.future = new Tetromino();
    self.field.start();
  };
};

void request_game()
{
  mode.change(4);
  engine.start();
  game_protocol.request_game();
}

void setup()
{
  size(800,600);
  stroke(255);
  PFont font= loadFont("monospace");
  textFont(font,18);
  frameRate(24);
}
var mode = new Mode();
var drawShape = new TetrominoDraw();
var drawField = new PlayFieldDraw();
var timer = new TimerAction();
var high_score = new HighScoreMode();
var lobby = new LobbyMode();
var network = new Net();
var over = new GameOverMode();
var title = new TitleMode();
var game_protocol = new GameProtocol(network);
var score_protocol = new ScoreProtocol(network);
var lobby_protocol = new LobbyProtocol(network);
var board = new ScoreBoardMode(score_protocol)
timer.addAction("network",60);
var engine = new Engine(game_protocol,mode);

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
  text("Score " + engine.score,300,50);
  drawInstruction();
  drawShape.draw_field(engine.field.field);
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
    title.switch_mode();
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
    high_score.display();
    break;
  case 5:
    break;
  }
}
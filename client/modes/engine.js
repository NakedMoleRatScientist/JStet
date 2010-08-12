
PFont font = loadFont("monospace")
void setup()
{
  size(800,600);
  stroke(255);
  textFont(font,18);
  frameRate(24);
}

function Engine(protocol,mode)
{
  var self = this;
  self.protocol = protocol;
  self.mode = mode;
  self.players = [];
  self.you = 0;
  protocol.engine = self;
  self.score = 0;
  self.find_player = function(id)
  {
    for (var i = 0;i < self.players.length;i++)
    {
      if (self.players[i].id == player)
      {
	return self.players[i];
      }
    }

  };
  self.write_shape = function(player,name,choice,type)
  {
    for (var i = 0;i < self.players.length;i++)
    {
      if (self.players[i].id == player)
      {
	self.players[i].write_shape(name,choice,type);
      }
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
  self.start = function(id)
  {
    new_player = new Player();
    new_player.start();
    new_player.id = id;
    self.players.push(new_player);
    self.you = id;
  };
  self.get_player = function(n)
  {
    return self.players[n];
  };
};

function EngineDraw()
{
  var self = this;
  self.instruction = new Instruction();
  self.drawField = new PlayFieldDraw();
  self.drawShape = new TetrominoDraw();
  self.display = function()
  {
    textFont(font,18);
    background(0,0,0);
    stroke(205,201,201);
    fill(0,0,0);
    //player one...
    text("Player One",75,50);
    rect(self.drawField.x,self.drawField.y,self.drawField.width,self.drawField.height); //playfield
    rect(self.drawField.x + self.drawField.width,self.drawField.y,100,self.drawField.height); //Info display field
    //player two
    text("Player Two",75,450);
    rect(self.drawField.x + 400,self.drawField.y,self.drawField.width,self.drawField.height); //playfield
    rect(self.drawField.x + 400 + self.drawField.width,self.drawField.y,100,self.drawField.height); //Info display field
    self.instruction.display();
    self.player_one();
    self.score();
  };
  self.player_one = function()
  {
    var one = engine.get_player(0);
    if (one.current.draw == true)
    {
      self.drawShape.create_blocks(one.current.get_list(),one.current.x,one.current.y,one.current.shape.color);
      text("Current: ",250,135);
      self.drawShape.create_blocks(one.current.get_list(),225,100,one.current.shape.color);
    }
    text("Next: ", 250,250);
    if (one.future.draw == true)
    {
      self.drawShape.create_blocks(one.future.get_list(),225,210,one.future.shape.color);
    }
    self.drawShape.draw_field(one.field.field);
  };
  self.score = function()
  {
    text("Score", 350,18);
    text("P1: " + engine.score,350,35);
    text("Player One",75,50);
  };
}

var mode = new Mode();
var timer = new TimerAction();
var high_score = new HighScoreMode();
var lobby = new LobbyMode();
var network = new Net();
var over = new GameOverMode();
var title = new TitleMode();
var game_protocol = new GameProtocol(network);
var score_protocol = new ScoreProtocol(network);
var lobby_protocol = new LobbyProtocol(network,lobby);
lobby.chat.protocol = lobby_protocol;
var board = new ScoreBoardMode(score_protocol)
timer.addAction("network",60);
var engine = new Engine(game_protocol,mode);
var engineDraw = new EngineDraw();
//Workaround for HTTP connections being droped after two minutes. Tried many settings to keep the connection alive to no avail. However, constant sending every minute does seem to keep the connection alive. This bug may not affect machines outside of the original's developer.





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
    engineDraw.display();
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
    lobby.display();
    break;
  }
}
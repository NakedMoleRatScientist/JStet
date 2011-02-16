
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
      if (self.players[i].id == id)
      {
	return self.players[i];
      }
    }

  };
  self.write_shape = function(id,name,choice,type)
  {
    var player = self.find_player(id);
    player.write_shape(name,choice,type);
  };
  //Update location.
  self.update_location = function(id,x,y)
  {
    var player = self.find_player(id);
    player.current.x = x;
    player.current.y = y;
  };
  self.move = function(x,y)
  {
    var player = self.find_player(self.you);
    player.current.move(x,y);
    var offset = player.field.calculate_positions(player.current.x,player.current.y);
    if (player.field.check(player.current.get_list(),offset[0],offset[1]) == false)
    {
      player.current.move(-x,-y);
    }
  };
  self.rotate = function(id,choice)
  {
    var player = self.find_player(id);
    player.current.rotate(choice);
  };
  self.line_action = function(id,line)
  {
    var player = self.find_player(id);
    player.field.move_lines(player.field.clear_line(line));
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


var mode = new Mode();
var timer = new TimerAction();
var high_score = new HighScoreMode();
var lobby = new LobbyMode();
var network = new Net();
var over = new GameOverMode();
var title = new TitleMode();
var waiting = new WaitingMode();
var list_protocol = new ListProtocol(network);
var list = new ListGameMode();
var create = new CreateGameMode();
var game_protocol = new GameProtocol(network);
var score_protocol = new ScoreProtocol(network);
var lobby_protocol = new LobbyProtocol(network,lobby);

lobby.chat.protocol = lobby_protocol;
var board = new ScoreBoardMode(score_protocol);
timer.addAction("network",60);
var engine = new Engine(game_protocol,mode);
var engineDraw = new EngineDraw();
//Workaround for HTTP connections being droped after two minutes. Tried many settings to keep the connection alive to no avail. However, constant sending every minute does seem to keep the connection alive. This bug may not affect machines outside of the original developer's.





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
  case 6:
    create.display();
    break;
  case 7:
    waiting.display();
    break;
  case 8:
    list.display();
    break;
  }
}

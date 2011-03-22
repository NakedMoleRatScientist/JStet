
PFont font = loadFont("monospace");
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
  self.state = 0;
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
  self.move = function(var x,var y)
  {
    var player = self.find_player(self.you);
    player.current.move(x,y);
    var offset = player.field.calculate_positions(player.current.x,player.current.y);
    if (player.field.check(player.current.get_list(),offset[0],offset[1]) == false)
    {
      player.current.move(-x,-y);
    }
  };
  self.rotate = function(var id, var choice)
  {
    var player = self.find_player(id);
    player.current.rotate(choice);
  };
  self.line_action = function(id,line)
  {
    var player = self.find_player(id);
    player.field.move_lines(player.field.clear_line(line));
  };
  self.stop = function(id)
  {
    self.destroy(id);
    console.log("Game over");
    self.mode.change(1);
  };
  self.destroy = function(id)
  {
    for (var i = 0; i < self.players.length; i++)
    {
      if (self.players[i].id == id)
      {
	self.players.splice(i,1);
	break;
      }
    }
  };
  self.create = function(var id)
  {
    var new_player = new Player();
    new_player.start();
    new_player.id = id;
    self.players.push(new_player);
  };
  self.high_score = function()
  {
    console.log("High score, detected!");
    self.mode.change(3);
  };
  self.start = function(var id)
  {
    self.create(id);
    self.you = id;
  };
  self.get_player = function(n)
  {
    return self.players[n];
  };
  self.key = function()
  {
    switch(key)
    {
      //move right, d
    case 100:
      game_protocol.move_right();
      break;
      //move down, s
    case 115:
      game_protocol.move_down();
      break;
      //move left, a
    case 97:
      game_protocol.move_left();
      break;
      //rotate, w
    case 119:
      game_protocol.rotate();
      break;
    case 10:
      if (self.state == 0)
      {
	game_protocol.confirm();
      }
      break;
    default:
      console.log(key);
      break;
    }
  };
};



//Workaround for HTTP connections being droped after two minutes. Tried many settings to keep the connection alive to no avail. However, constant sending every minute does seem to keep the connection alive. This bug may not affect machines outside of the original developer's.





void sendAlive()
{
  if (timer.getEvent() == "network")
  {
    network.sendAlive();
  }
}



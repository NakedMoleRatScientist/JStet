


function Engine()
{
  var self = this;
  game_protocol.engine = self;
  self.players = [];
  self.you = 0;
  self.score_one = 0;
  self.score_two = 0;
  self.state = 0;
  self.find_player = function(var id)
  { 
    for (var i = 0;i < self.players.length;i++)
    {
      if (self.players[i].id == id)
      {
	return self.players[i];
      }
    }
  };
  self.write_shape = function(var id,var name,var choice,var type)
  {
    var player = self.find_player(id);
    player.write_shape(name,choice,type);
  };
  //Update location.
  self.update_location = function(var id,var x,var y)
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
  self.line_action = function(var id,var line)
  {
    var player = self.find_player(id);
    player.field.move_lines(player.field.clear_line(line));
  };
  self.stop = function(var id)
  {
    self.destroy(id);
    console.log("Game over");
    mode.change(1);
  };
  self.change_score = function(var id,var score)
  {
    if (id == self.you)
    {
      self.score_one = score;
    }
    else
    {
      self.score_two = score;
    }
  };
  self.destroy = function(var id)
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
    console.log("High score detected!");
    mode.change(3);
  };
  self.start = function(var id)
  {
    self.create(id);
    self.you = id;
  };
  self.get_player = function(var n)
  {
    return self.players[n];
  };
  self.key = function()
  {
    if (self.state == 1)
    {
      switch(key)
      {
      case 100:
	//move right, d
	self.move(20,0);
	game_protocol.move_right();
	break;
	//move down, s
      case 115:
	self.move(0,20);
	game_protocol.move_down();
	break;
	//move left, a
      case 97:
	self.move(-20,0);
	game_protocol.move_left();
	break;
	//rotate, w
      case 119:
	game_protocol.rotate();
	break;
      default:
	console.log(key);
      }
    }
    else
    {
      switch(key)
      {
      case 10:
	game_protocol.confirm();
	break;
      default:
	console.log(key);
	break;
      }
    }
  };
};



//Workaround for HTTP connections being droped after two minutes. Tried many settings to keep the connection alive to no avail. However, constant sending every minute does seem to keep the connection alive. This bug may not affect machines outside of the original developer's.





void sendAlive()
{
  if (timer.getEvent() == "network")
  {
    net.sendAlive();
  }
}



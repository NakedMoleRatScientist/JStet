

//Data type is 2 for gameplay commands.
function GameProtocol(var net)
{
  var self = this;
  self.net = net;
  self.net.game = self;
  self.engine = null;
  self.lastMessage = null;
  self.request_game = function()
  {
    var data = [2,0];
    self.net.send(data);
  };
  self.request_multi = function(var password, var name)
  {
    if (password == "")
    {
      password = null;
    }
    var data = [2,3,name,password];
    self.net.send(data);
  };
  //join a game
  self.request_join = function(var name)
  {
    var data = [2,5,name];
    self.net.send(data);
  };
  self.move_right = function()
  {
    var data = [2,2,1];
    self.engine.move(20,0);
    self.net.send(data);
  };
  self.move_left = function()
  {
    var data = [2,2,2];
    self.engine.move(-20,0);
    self.net.send(data);
  };
  self.move_down = function()
  {
    var data = [2,2,3];
    self.engine.move(0,20);
    self.net.send(data);
  };
  self.rotate = function()
  {
    var data = [2,2,4];
    self.net.send(data);
  };
  self.process_data = function(var data)
  {
    switch(data[1])
    {
    //initialize game mode.
    case 0:
      console.log("Game initialized.");
      self.net.send([2,4]);
      self.engine.start(data[0]); //Create a new player instance
      mode.change(4);
      break;
    case 1:
      //Get new shape.
      if (self.checkIdentical(data))
      {
        console.log("New shape, ordered.");
	self.engine.write_shape(data[0],data[2],data[3],data[4]);
        self.net.send([2,1]);
      }
      break;
    case 2:
      console.log("Movement detected.");
      //Get movement update for current.
      if (self.checkIdentical(data))
      {
	self.engine.update_location(data[0],data[2],data[3]);
	self.net.send([2,1]);
      }
      break;
    case 3:
      //Rotation.
      if (self.checkIdentical(data))
      {
	console.log("Rotation detected.");
	self.engine.rotate(data[0],data[2]);
	self.net.send([2,1]);
      }
      break;
    case 4:
      //Kill some lines.
      if (self.checkIdentical(data))
      {
	self.engine.line_action(data[0],data[2]);
      }
      break;
    case 5:
      //Get score data.
      if (self.checkIdentical(data))
      {
	self.engine.score = data[2];
      }
      break;
    case 6:
      //destruction of the game
      self.engine.stop(self.engine.you);
      self.net.send([3]);
      break;
    case 7:
      self.engine.stop(self.engine.you);
      self.engine.high_score();
      self.net.send([3]);
      break;
    }
  };
  self.pushMessage = function(var data)
  {
    self.lastMessage = new Array();
    for (var i = 0;i < data.length;i++)
    {
      self.lastMessage.push(data[i]);
    };
  };
  self.checkIdentical = function(var data)
  {
    if (self.lastMessage == null || self.lastMessage != data.length - 1)
    {
      self.pushMessage(data);
      return true;
    }
    else
    {
      for (var i = 0;i < self.lastMessage.length;i++)
      {
	if (self.lastMessage[i] != data[i + 1])
	{
	  self.pushMessage(data);
	  return true;
	}
      }
    }
    return false;
  };
}

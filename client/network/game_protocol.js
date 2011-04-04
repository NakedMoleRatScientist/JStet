

//Data type is 2 for gameplay commands.
function GameProtocol()
{
  var self = this;
  self.lastMessage = null;
  self.request_game = function()
  {
    var data = [2,0];
    net.send(data);
  };
  self.setup = function()
  {
    var data = [2,6];
    net.send(data);
  };
  self.request_multi_empty = function()
  {
    var data = [2,6];
    net.send(data);
  };
  self.request_multi = function(var password, var name)
  {
    if (password == "")
    {
      password = null;
    }
    var data = [2,3,name,password];
    net.send(data);
  };
  //confirm to tell the server the player is ready to play
  self.confirm = function()
  {
    var data = [2,5];
    net.send(data);
  };
  self.move_right = function()
  {
    var data = [2,2,1];
    net.send(data);
  };
  self.move_left = function()
  {
    var data = [2,2,2];
    net.send(data);
  };
  self.move_down = function()
  {
    var data = [2,2,3];
    net.send(data);
  };
  self.rotate = function()
  {
    var data = [2,2,4];
    net.send(data);
  };
  self.request_delete = function()
  {
    var data = [3];
    net.send(data);
  };
  self.process_data = function(var data)
  {
    switch(data[1])
    {
    case 0:
      console.log("Game initialized.");
      if (self.checkIdentical(data))
      {
	mode.change(4);
	engine.start(data[2]);
      }
      break;
    case 1:
      //Get new shape.
      if (self.checkIdentical(data))
      {
        console.log("New shape, ordered.");
	engine.write_shape(data[0],data[2],data[3],data[4]);
        net.send([2,1]);
      }
      break;
    case 2:
      console.log("Movement detected.");
      //Get movement update for current.
      if (self.checkIdentical(data))
      {
	engine.update_location(data[0],data[2],data[3]);
	net.send([2,1]);
      }
      break;
    case 3:
      //Rotation.
      if (self.checkIdentical(data))
      {
	console.log("Rotation detected.");
	engine.rotate(data[0],data[2]);
	net.send([2,1]);
      }
      break;
    case 4:
      //Kill some lines.
      if (self.checkIdentical(data))
      {
	engine.line_action(data[0],data[2]);
      }
      break;
    case 5:
      //Get score data.
      if (self.checkIdentical(data))
      {
	engine.change_score(data[0],data[2]);
      }
      break;
    case 6:
      //destruction of the game
      if (self.checkIdentical(data))
      {
	engine.stop(engine.you);
      }
      break;
    case 7:
      //high score
      if (self.checkIdentical(data))
      {
	engine.high_score();
      }
      break;
    case 8:
      //start the game
      if (self.checkIdentical(data))
      {
	console.log("Starting game.");
	engine.state = 1;
	net.send([2,4]);
      }
      break;
    case 9:
      if (self.checkIdentical(data))
      {
	console.log(self.engine.you);
	if (data[2] == self.engine.you)
	{
	  console.log("Ready for action!");
	  engine.ready = 1;
	}
      }
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

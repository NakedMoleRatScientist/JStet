

//Data type is 2 for gameplay commands.
function GameProtocol(net)
{
  var self = this;
  self.net = net;
  self.net.game = self;
  self.engine = null;
  self.lastMessage = null;
  self.request_game = function()
  {
    data = [2,0];
    self.net.send(data);
  };
  self.move_right = function()
  {
    data = [2,2,1];
    self.engine.move(20,0);
    self.net.send(data);
  };
  self.move_left = function()
  {
    data = [2,2,2];
    self.engine.move(-20,0);
    self.net.send(data);
  };
  self.move_down = function()
  {
    data = [2,2,3];
    self.engine.move(0,20);
    self.net.send(data);
  };
  self.rotate = function()
  {
    data = [2,2,4];
    self.net.send(data);
  };
  self.process_data = function(data)
  {
    switch(data[1])
    {
    //initialize game mode.
    case 0:
      console.log("Game initialized.");
      mode.change(4);
      self.engine.start(data[0]);
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
	self.engine.line_action(data[1]);
      }
      break;
    case 5:
      //Get score data.
      if (self.checkIdentical(data))
      {
	self.engine.score = data[1];
      }
      break;
    case 6:
      self.engine.stop();
      self.net.send([3]);
      break;
    case 7:
      self.engine.high_score();
      break;
    }
  };
  self.pushMessage = function(data)
  {
    self.lastMessage = new Array();
    for (var i = 0;i < data.length;i++)
    {
      self.lastMessage.push(data[i]);
    }
  };
  self.checkIdentical = function(data)
  {
    if (self.lastMessage == null || self.lastMessage != data.length - 1)
    {
      self.pushMessage(data);
      return true;
    }
    else
    {
      for (i = 0;i < self.lastMessage.length;i++)
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

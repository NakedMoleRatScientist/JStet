
//Data type is 2 for gameplay commands.
function GameProtocol(net)
{
  var self = this;
  self.net = net;
  self.net.game = self;
  self.engine = null;
  self.lastMessage = null;
  self.requestGame = function()
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
  self.processData = function(data)
  {
    switch(data[0])
    {
    case 1:
      if (self.checkIdentical(data))
      {
        console.log("New shape, ordered.");
	engine.write_shape(data[1],data[2],data[3]);
        self.net.send([2,1]);
      }
      break;
    case 2:
      if (self.checkIdentical(data))
      {
	console.log("Movement detected.");
	engine.update_location(data[1],data[2]);
	self.net.send([2,1]);
      }
      break;
    case 3:
      if (self.checkIdentical(data))
      {
	console.log("Rotation detected.");
	engine.rotate(data[1]);
	self.net.send([2,1]);
      }
      break;
    case 4:
      if (self.checkIdentical(data))
      {
	self.engine.line_action(data[1]);
      }
      break;
    case 5:
      if (self.checkIdentical(data))
      {
	self.engine.score = data[1];
      }
      break;
    }
  };
  self.pushMessage = function(data)
  {
    self.lastMessage = new Array();
    for (i = 1;i < data.length;i++)
    {
      self.lastMessage.push(data[i]);
    }
  };
  self.checkIdentical = function(data)
  {
    if (self.lastMessage == null)
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


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
  self.moveRight = function()
  {
    data = [2,2,1];
    self.net.send(data);
  };
  self.moveLeft = function()
  {
    data = [2,2,2];
    self.net.send(data);
  };
  self.moveDown = function()
  {
    data = [2,2,3];
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
        console.log("Reaction sent.");
	engine.write_shape(data[1],data[2],data[3]);
        self.net.send([2,1]);
      }
      break;
    case 2:
      if (self.checkIdentical(data))
      {
	console.log("Movement detected.");
	engine.move(data[1],data[2]);
	self.net.send([2,1]);
      }
      break;
    case 3
      if (self.checkIdentical(data))
      {
	console.log("Rotation detected.");
	self.net.send([2,1]);
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


//Data type is 2 for gameplay commands.
function GameProtocol(net)
{
  var self = this;
  self.net = net;
  self.net.game = self;
  self.requestGame = function()
  {
    data = [2,0];
    self.net.send(data);
  };
  self.processData = function(data)
  {
    switch(data[0])
    {
    case 2:
      self.net.send([2,1]);
      break;
    }
  };
}

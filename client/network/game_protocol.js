
//Data type is 2 for gameplay commands.
function GameProtocol(net)
{
  var self = this;
  self.net = net;
  self.requestGame = function()
  {
    data = [2,0];
    self.net.send(data);
  };
}

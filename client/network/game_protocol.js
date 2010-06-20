
//Data type is 2 for gameplay commands.
function GameProtocol(net)
{
  var self = this;
  self.net = net;
  self.requestGame = function()
  {
    data = [2,"new"];
    self.net.send(data);
  };
}

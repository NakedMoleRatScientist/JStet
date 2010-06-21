
//Data type is 2 for gameplay commands.
function GameProtocol(net)
{
  var self = this;
  self.net = net;
  self.requestGame = function()
  {
    data = [2,0];
    JSON.stringify(data);
    self.net.send(data);
  };
}

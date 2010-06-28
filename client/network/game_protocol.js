
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
  self.processData = function(data)
  {
    switch(data)
    {
    case 1:
      console.log("success");
      break;
    }
  };
}


function LobbyProtocol(net)
{
  var self = this;
  self.net = net;
  self.net.lobby = self;
  self.process_data = function(data)
  {
    
  };
  self.send = function(message)
  {
    var data = [1,1,message]
  };
}
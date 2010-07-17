
function LobbyProtocol(net)
{
  var self = this;
  self.net = net;
  self.net.lobby = self;
}
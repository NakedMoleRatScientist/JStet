
function LobbyProtocol(net)
{
  var self = this;
  self.net = net;
  self.net.lobby = self;
  self.process_data = function(data)
  {
    switch(data[1])
    {
    case 1:
      self.lobby.chat.add_message(data[2]);
      break;
    }
  };
  self.send = function(message)
  {
    var data = [1,1,message];
    self.net.send(data);
  };
}
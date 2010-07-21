
function LobbyProtocol(net,lobby)
{
  var self = this;
  self.net = net;
  self.net.lobby = lobby;
  self.process_data = function(data)
  {
    switch(data[0])
    {
    case 1:
      console.log("Chat detected.");
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

function LobbyProtocol(net,lobby)
{
  var self = this;
  self.mode = lobby
  self.net = net;
  self.net.lobby = self;
  self.process_data = function(data)
  {
    switch(data[0])
    {
    case 1:
      console.log("Chat detected.");
      self.mode.chat.add_message(data[1]);
      break;
    }
  };
  self.send = function(message)
  {
    var data = [1,1,message];
    self.net.send(data);
  };
}
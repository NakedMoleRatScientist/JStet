
function LobbyProtocol(lobby)
{
  var self = this;
  self.mode = lobby;
  self.process_data = function(data)
  {
    switch(data[0])
    {
    case 1:
      console.log("Typing detected.");
      self.mode.chat.add_message(data[1]);
      break;
    case 2:
      self.mode.chat.add_message("Nick change unsuccessful.");
      break;
    case 3:
      self.mode.chat.add_message("Nick change successful.");
      break;
    }
  };
  self.send = function(message)
  {
    var data = [1,1,message];
    net.send(data);
  };

  self.nick = function(nick)
  {
    var data = [1,2,nick];
    net.send(data);
  };
}

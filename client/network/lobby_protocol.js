
function LobbyProtocol()
{
  var self = this;
  self.process_data = function(data)
  {
    switch(data[0])
    {
    case 1:
      console.log("Typing detected.");
      lobby.chat.add_message(data[1]);
      break;
    case 2:
      lobby.chat.add_message("Nick change unsuccessful.");
      break;
    case 3:
      lobby.chat.add_message("Nick change successful.");
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

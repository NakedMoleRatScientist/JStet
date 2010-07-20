
function LobbyMode()
{
  var self = this;
  self.chat = new Chat();
  self.display = function()
  {
    self.chat.display();
  };
}
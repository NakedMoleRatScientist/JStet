
function LobbyMode()
{
  var self = this;
  self.chat = new Chat();
  self.display = function()
  {
    background(0,0,0);
    self.chat.display();
  };
}
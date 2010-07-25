
function LobbyMode()
{
  var self = this;
  self.chat = new Chat();
  self.display = function()
  {
    background(0,0,0);
    self.chat.display();
    noFill();
    rect(0,550,800,50);
  };
  self.switch_mode = function()
  {
    mode.change(6);
  };
}
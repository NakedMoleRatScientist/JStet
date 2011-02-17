
function WaitingMode()
{
  var self = this;
  self.password = null;
  self.display = function()
  {
    background(0,0,0);
    textFont(font,18);
    text("Waiting for another player to join...",250,350);
  };
}

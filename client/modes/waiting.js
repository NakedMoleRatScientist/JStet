
function WaitingMode()
{
  var self = this;
  self.display = function()
  {
    textFont(font,18);
    text("Waiting for another player to join...",250,350);
  };
}

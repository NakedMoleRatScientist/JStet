
function PrivateButton()
{
  var self = this;
  self.private_session = new RectObject(450,75,100,50);
  self.display = function()
  {
    noFill();
    textFont(font,25);
    self.private_session.draw();
    text("Private Game",475,80);
  };
}
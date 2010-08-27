
function PrivateButton()
{
  var self = this;
  self.private_session = new RectObject(450,75,100,50);
  self.display = function()
  {
    noFill();
    textFont(font,15);
    self.private_session.draw();
    text("Create Game",450,110);
  };
}
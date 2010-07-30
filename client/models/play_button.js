
function PlayButton()
{
  var self = this;
  self.play = new RectObject(450,20,100,50);
  self.display = function()
  {
    noFill();
    textFont(font,25);
    self.play.draw();
    text("Play",475,55);
  };
}

function PlayButton()
{
  var self = this;
  self.play = new RectObject(450,20,100,50);
  self.collision = new Collision();
  self.collision.add_rect(self.play);
  self.display = function()
  {
    noFill();
    textFont(font,25);
    self.play.draw();
    text("Play",475,55);
  };
}
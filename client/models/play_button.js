
function PlayButton()
{
  var self = this;
  self.display = function()
  {
    noFill();
    textFont(font,25);
    rect(450,20,100,50);
    text("Play",475,55);
  };
}
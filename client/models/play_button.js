
function PlayButton()
{
  var self = this;
  self.display = function()
  {
    noFill();
    rect(450,20,100,50);
    text("Play",475,55);
  };
}
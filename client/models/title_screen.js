

function TitleScreen()
{
  var self = this;
  self.display = function()
  {
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,50);
    text("JStet",300,300);
  };
}

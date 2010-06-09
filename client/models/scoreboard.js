function ScoreBoard()
{
  var self = this;
  self.title = function()
  {
    background(0,0,0)
    PFont font = loadFont("monospace");
    textFont(font,18);
    text("HIGH SCORE LIST",250,50);
  }
}
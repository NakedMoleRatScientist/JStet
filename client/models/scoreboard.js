function ScoreBoard(score)
{
  var self = this;
  self.score = score;
  self.title = function()
  {
    background(0,0,0)
    PFont font = loadFont("monospace");
    textFont(font,18);
    text("HIGH SCORE LIST",250,50);
  }
  self.display = function()
  {
    self.title();
  }
}
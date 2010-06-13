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
  };
  self.instruction = function()
  {
    text("Instructions:",350,50);
    text("n - new game",350,75);
  }
  self.list = function()
  {
    data = score.network.getData();
    y = 70;
    for (int i = 0;i < 100;i++)
    {
      if (data.names[i] != "nothing")
      {
        text(data.names[i] + " : " + data.scores[i],250,y+= 20);
      }
      else
      {
        return;
      }
    };
  };
  self.display = function()
  {
    self.title();
    self.list();
  };
}


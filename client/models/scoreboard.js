
function ScoreBoard(protocol)
{
  var self = this;
  self.protocol = protocol;
  self.start = 0;
  self.turn = false;
  self.title = function()
  {
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,18);
    text("HIGH SCORE LIST",250,50);
  };
  self.page = function()
  {
    text("Page: " + (this.start / 20),200,550);
  };
  self.instruction = function()
  {
    text("Instructions:",500,50);
    text("n - new game",500,75);
    text("k - next page",500,100);
    text("j - previous page",500,125);
  };
  self.list = function()
  {
    var data = self.protocol.getData();
    y = 70;
    limit = self.start + 20;
    self.turn = true;
    for (var i = self.start;i < limit;i++)
    {
      if (data.names[i] != "nothing")
      {
        text(data.names[i] + " : " + data.scores[i],250,y+= 20);
      }
      else
      {
        self.turn = false;
        return;
      }
    };
  };
  self.turnPage = function()
  {
    if (self.turn == true)
    {
      self.start += 20;
      if (self.start == 100)
      {
        self.start = 80;
      }
    }
  };
  self.previousPage = function()
  {
    if (self.start > 0)
    {
      self.start -= 20;
    }
  };
  self.display = function()
  {
    self.title();
    self.instruction();
    self.list();
    self.page();
  };
}


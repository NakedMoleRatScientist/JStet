
function HighScore()
{
  var self = this;
  self.name = "";
  self.display = function()
  {
    background(0,0,0);
    noFill();
    rect(300,305,55,30);
    text("You have beaten a score in the worldwide top 100 ranking.",100,250);
    text("Please enter your 5 letters identifer.",200,275);
    text("Your identifer: ",250,300);
    text(self.name,300,325);
  };
  self.clean = function()
  {
    self.name = "";
  }
  self.addLetter = function(letter)
  {
    if (self.name.length != 5)
    {
      self.name += letter;
    }
  };
  self.destroy = function()
  {
    if (self.name.length != 0)
    {
      self.name = self.name.substring(0,self.name.length - 1);
    };
  };
  self.getName = function()
  {
    return self.name;
  }
}
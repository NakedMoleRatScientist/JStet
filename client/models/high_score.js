
function HighScore()
{
  var self = this;
  self.name = "";
  self.display = function()
  {
    text("Your name: ",300,300);
    text(self.name,300,325);
  };
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
      if (self.name.length == 1)
      {
        self.name = "";
      }
      else
      {
        self.name = self.name.substring(self.name.length - 1);
      }
    };
  };
}
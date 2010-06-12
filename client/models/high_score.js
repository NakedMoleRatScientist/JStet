
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
  self.delete = function()
  {
    if (self.name.length != 0)
    {
      self.name = self.name.substring(self.name.length);
    }
  };
}

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
    self.name += letter;
  };
}

function HighScore()
{
  var self = this;
  self.name = "";
  self.display = function()
  {
    text("Your name: ",300,300);
    text(self.name);
  };
}
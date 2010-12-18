
function HighScoreMode()
{
  var self = this;
  self.name = new Input();
  self.display = function()
  {
    background(0,0,0);
    noFill();
    rect(300,305,55,30);
    text("You have beaten a score in the worldwide top 100 ranking.",100,250);
    text("Please enter your 5 letters identifer.",200,275);
    text("Your identifer: ",250,300);
    text(self.name.string,300,325);
  };
  self.get_name = function()
  {
    return self.name;
  }
}

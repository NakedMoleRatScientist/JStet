
function HighScoreMode()
{
  var self = this;
  self.name = new Input();
  self.display = function()
  {
    textFont(font,18);
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
  self.key = function()
  {
    var info = typing();
    switch (info)
    {
    case false:
      break;
    case -8:
      high_score.name.destroy();
      break;
    case -10:
      score_protocol.transmit_score(high_score.get_name(),engine.score);
      high_score.name.clean();
      mode.change(2);
      break;
    default:
      high_score.name.addLetter(info);
      break;
    }
  };
}


function CreateGameMode()
{
  var self = this;
  self.others = false;
  self.players = function()
  {
    textFont(font,18);
    text("Single or two players?",0,0);
  };
  self.display = function()
  {
    background(0,0,0);
  };
}
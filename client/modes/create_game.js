
function CreateGameMode()
{
  var self = this;
  self.others = false;
  self.radio = new RadioButton();
  self.players = function()
  {
    textFont(font,18);
    text("Single or two players?",0,18);
    self.radio.display(20,40);
  };
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.players();
  };
}
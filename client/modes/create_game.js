
function CreateGameMode()
{
  var self = this;
  self.others = false;
  self.radio = new RadioButton();
  self.radio.set(20,40);
  self.players = function()
  {
    textFont(font,18);
    text("Single or two players?",0,18);
    self.radio.display();
    self.radio.text("One");
  };
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.players();
  };
}
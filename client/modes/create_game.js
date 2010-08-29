
function CreateGameMode()
{
  var self = this;
  self.others = false;
  self.one = new OneButton();
  self.one.set(20,40);
  self.players = function()
  {
    textFont(font,18);
    text("Single or two players?",0,18);
    self.one.display();
    self.one.text("One");
  };
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.players();
  };
}
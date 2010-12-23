
function CreateGameMode()
{
  var self = this;
  self.others = false;
  self.one = new RadioButton();
  self.one.set(20,40);
  self.two = new RadioButton();
  self.two.set(90,40);
  self.collision = new Collision();
  self.pages = new Pages();
  self.pages.add(new PlayersPage(self.collision));
  self.players = function()
  {

    text("Passphrase:",0,65);
  };
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.pages.run()
  };
}

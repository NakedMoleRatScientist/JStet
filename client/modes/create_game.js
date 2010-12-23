
function CreateGameMode()
{
  var self = this;
  self.others = false;
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

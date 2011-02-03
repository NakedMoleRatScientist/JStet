
function CreateGameMode()
{
  var self = this;
  self.others = false;
  self.pages = new Pages();
  self.pages.data.create("players");
  self.pages.data.create("password");
  self.pages.data.create("name");
  self.pages.add(new PlayersPage(self.pages));
  self.pages.add(new PasswordPage(self.pages));
  self.pages.add(new PassEntryPage(self.pages));
  self.pages.initialize();
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.pages.run()
  };
}

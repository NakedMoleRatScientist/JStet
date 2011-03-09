
function ListGameMode()
{
  var self = this;
  self.pages = new Pages();
  self.pages.data.create("pointer");
  self.pages.add(new GameListPage(self.pages));
  self.pages.add(new JoinPage(self.pages));
  self.pages.initialize();
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.pages.run();
  };
}

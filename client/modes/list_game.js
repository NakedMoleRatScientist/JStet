
function ListGameMode()
{
  var self = this;
  self.pages = new Pages();
  self.pages.add(new GameListPage(self.pages));
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
  };
}

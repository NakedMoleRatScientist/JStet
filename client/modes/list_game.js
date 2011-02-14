
function ListGameMode()
{
  var self = this;
  self.pages = new Pages();
  self.pages.add(new GameListPage(self.pages));
  self.refresh = new TextButton("Refresh",100,450,20);
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.refresh.display();
  };
}

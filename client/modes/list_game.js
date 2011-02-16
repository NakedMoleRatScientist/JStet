
function ListGameMode()
{
  var self = this;
  self.pages = new Pages();
  self.pages.add(new GameListPage(self.pages));
  self.pages.initialize();
  list_protocol.request_list();
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.pages.run();
  };
}

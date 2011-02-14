
function GameListPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = false;
  self.initialize = function()
  {
    self.refresh = new TextButton("Refresh",100,450,20);
    self.effects = new ListEffects();
    self.effects.add(self.refresh.rect);
  };
  self.call = function()
  {
    self.refresh.display();
  };
}

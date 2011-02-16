
function GameListPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = false;
  self.initialize = function()
  {
    self.refresh = new TextButton("Refresh",100,450,20);
    self.effects = new ListEffects(self);
    self.effects.add(self.refresh.rect);
    self.pages.collision.effects.add_effect(self.effects);
  };
  self.games = function()
  {
    var size = list_protocol.games;
    if (size == 0)
    {
      text("There are no games running.",0,18);
    }
  };
  self.call = function()
  {
    textFont(font,18);
    self.games();
    self.refresh.display();
  };
}

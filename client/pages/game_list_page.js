
function GameListPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = false;
  self.games = [];
  self.initialize = function()
  {
    self.refresh = new TextButton("Refresh",100,450,20);
    self.effects = new ListEffects(self);
    self.effects.add(self.refresh.rect);
    self.pages.collision.effects.add_effect(self.effects);
  };
  self.games = function()
  {
    text("There are " + list_protocol.games + " games running.",0,18);
  };
  self.call = function()
  {
    textFont(font,18);
    self.games();
    self.refresh.display();
  };
}

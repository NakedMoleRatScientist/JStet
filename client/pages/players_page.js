
function PlayersPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.instant = new TextButton("Instant Multiplayer",100,100,100);
    self.custom = new TextButton("Custom Game",100,100,200);
    self.effect = new PlayersEffects(self.pages);
    self.pages.collision.effects.add_effect(new PlayersEffects(self.pages));    
  };
  self.call = function()
  {
    textFont(font,18);
  };
  self.key = function()
  {
  };
}


function PlayersPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.instant = new TextButton("Instant Multiplayer",100,100);
    self.pages.collision.effects.add_effect(self.radio_switch);
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

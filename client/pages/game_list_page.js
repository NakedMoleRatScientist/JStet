
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
  self.names = function()
  {

    line(99,99,99,300);
    var increment = 100;
    for (var i = 0; i < list_protocol.names.length; i++)
    {
      text(list_protocol.names[i],100,increment);
      increment += 18;
    } 
  };
  self.games = function()
  {
    text("There are " + list_protocol.games + " game(s) running",0,18);
  };
  self.call = function()
  {
    textFont(font,18);
    self.games();
    self.names();
    self.refresh.display();
  };
}

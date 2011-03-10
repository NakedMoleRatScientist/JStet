
function JoinPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = false;
  self.game = null;
  self.initialize = function()
  {
    self.game = self.pages.data.get("game");
    self.yes = new TextButton("Yes",100,300,300);
    self.no = new TextButton("No",100,400,300);
    self.effects = new JoinEffects();
    self.effects.add(self.yes.rect);
    self.effects.add(self.no.rect);
  };
  self.call = function()
  {
    textFont(font,18);
    text("Do you wish to join the game: " + self.game,280,280);
    self.yes.display();
    self.no.display();
  };
}


function JoinPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.name = self.pages.data.get("name");
    self.yes = new TextButton("Yes",100,300,300);
    self.no = new TextButton("No",100,400,300);
    self.effects = new JoinEffects(self,self.pages);
    self.effects.add(self.yes.rect);
    self.effects.add(self.no.rect);
    self.pages.collision.effects.add_effect(self.effects);
  };
  self.call = function()
  {
    textFont(font,18);
    text("Do you wish to join the game: " + self.name,280,280);
    self.yes.display();
    self.no.display();
  };
  self.key = function()
  {
    
  };
}

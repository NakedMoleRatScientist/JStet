
function NamePage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = true;
  self.initialize = function()
  {
    self.pages.collision.effects.add(new NameEffects(self.pages));
  };
  self.call = function()
  {
    self.type_text();
  };
  self.type_text = function()
  {
    textFont(font,18);
    text("What do you wish the name of the game to be?",150,210);
    text(self.pages.input.string,170,240);
    text("When you're done, presse enter",180,265); 
  };
}

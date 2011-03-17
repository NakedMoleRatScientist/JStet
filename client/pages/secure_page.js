
function SecurePage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.effects = new SecureEffects(self.pages,self);
    self.effects.add_input();
    self.effects.type = true;
  };
  self.call = function()
  {
    textFont(font,18);
    text("Please enter the password for this game",300,300);
  };
  self.key = function()
  {
    activeType(self.effects);
  };
}

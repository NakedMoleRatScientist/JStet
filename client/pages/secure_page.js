
function SecurePage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = true;
  self.initialize = function()
  {
    self.effects = new SecureEffects(self.pages,self);
  };
  self.call = function()
  {
    textFont(font,18);
    text("Please enter the password for this game",300,300);
  };
}

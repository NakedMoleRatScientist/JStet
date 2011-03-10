
function SecurePage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.effects = new SecureEffects(self.pages,self);
  };
}

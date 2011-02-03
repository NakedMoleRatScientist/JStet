
function PassEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.check = function()
  {
    self.pages.data.update("password",self.pages.input.string);
  };
}

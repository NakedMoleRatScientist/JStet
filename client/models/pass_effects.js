
function PassEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.act = function()
  {
    self.pages.data.update("password",self.pages.input.string);
  };
}

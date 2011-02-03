
function PassEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.check = function(var object)
  {
    self.pages.data.update("password",self.pages.input.string);
  };
}

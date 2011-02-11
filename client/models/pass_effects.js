
function PassEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.check = function(var object)
  {
    if (object.type == 2)
    {
      self.pages.data.update("password",self.pages.input.string);
      self.pages.act();
    }
  };
}

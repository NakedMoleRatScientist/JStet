
function NameEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.check = function(var object)
  {
    self.pages.data.update("name",self.pages.input.string);
  };
}

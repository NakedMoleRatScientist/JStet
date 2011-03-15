
function NameEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 2)
    {
      self.pages.data.update("name",self.input.string);
      self.pages.act();
    }
  };
}

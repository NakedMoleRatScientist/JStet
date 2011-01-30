
function PageEffect(var pages)
{
  var self = this;
  self.pages = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 3)
    {
      self.collision.clean()
      self.pages.forward();
      self.pages.initialize();
    }
  };
}

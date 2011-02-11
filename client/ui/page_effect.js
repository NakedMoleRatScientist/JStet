
function PageEffect(var pages)
{
  var self = this;
  self.pages = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 3)
    {
      self.pages.collision = new Collision();
      self.pages.forward();
      self.pages.initialize();
      self.pages.input = new Input();
    }
  };
}

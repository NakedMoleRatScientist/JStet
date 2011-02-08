
function PageEffect(var pages)
{
  var self = this;
  self.pages = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    console.log("boop");
    if (object.type == 3)
    {
      console.log("doop");
      self.pages.collision.clean()
      self.pages.forward();
      self.pages.initialize();
    }
  };
}

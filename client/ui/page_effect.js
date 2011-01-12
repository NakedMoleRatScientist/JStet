
function PageEffect(var pages)
{
  var self = this;  
  self.pages = pages;
  self.buttons = [];
  self.add = function(var button)
  {
    self.buttons.push(button);
  };
  self.check = function(var n)
  {
    if (self.buttons[n].type == 3)
    {
      self.pages.forward();
    }
  };
  self.use = function(var collision)
  {
    self.collision = collision;
  };
}

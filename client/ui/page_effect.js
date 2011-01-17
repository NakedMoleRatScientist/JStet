
function PageEffect(var pages)
{
  var self = this;
  self.pages = pages;
  self.buttons = [];
  self.counter = 0;
  self.add = function(var button)
  {
    button.member = self.counter;
    self.counter ++;
    self.buttons.push(button);
  };
  self.check = function(var object)
  {
    if (object.type == 3)
    {
      self.pages.forward();
    }
  };
  self.use = function(var collision)
  {
    self.collision = collision;
    for (var i = 0; i < self.buttons.length; i++)
    {
      self.collision.add(self.buttons[i]);
    }
  };
}


function Effect(var parent)
{
  var self = parent;
  self.elements = [];
  self.counter = 0;
  self.add = function(var button)
  {
    button.member = self.counter;
    self.counter ++;
    self.elements.push(button);
  };
  self.use = function(var collision)
  {
    self.collision = collision;
    for (var i = 0; i < self.elements.length; i++)
    {
      self.collision.add(self.elements[i]);
    }
  };
}

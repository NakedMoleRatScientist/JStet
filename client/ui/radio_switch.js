
function RadioSwitch()
{
  var self = this;
  self.circles = [];
  self.counter = 0;
  self.add = function(var button)
  {
    button.member = self.counter;
    self.counter ++;
    self.circles.push(button);
  };
  self.check = function(var object)
  {
    if (object.type == 1)
    {
      for(var i = 0; i < self.circles.length; i++)
      {
	if (i != object.member)
	{
	  self.circles[i].state = false;
	}
      }
    }
  };
  self.use = function(var collision)
  {
    self.collision = collision;
    for (var i = 0; i < self.circles.length; i++)
    {
      self.collision.add(self.circles[i]);
    }
  };
}

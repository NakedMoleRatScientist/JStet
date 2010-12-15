
function RadioSwitch(var circles)
{
  var self = this;
  self.circles = circles;
  self.add_switch = function(var button)
  {
    self.circles.push(button);
  };
  self.update = function(var n)
  {
    self.circles[n].state = true;
    for(var i = 0; i < self.circles.size; i++)
    {
      if (i != n)
      {
	self.circles[i].state = false;
      }
    }
  };
}

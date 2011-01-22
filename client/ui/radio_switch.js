
function RadioSwitch()
{
  var self = this;
  self.circles = [];
  self.counter = 0;
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
}

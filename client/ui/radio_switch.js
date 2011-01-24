
function RadioSwitch()
{
  var self = this;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 1)
    {
      for(var i = 0; i < self.elements.length; i++)
      {
	if (i != object.member)
	{
	  self.elements[i].state = false;
	}
	else
	{
	  self.elements[i].state = true;
	}
      }
    }
  };
}

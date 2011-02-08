

function Collision()
{
  var self = this;
  self.elements = [];
  self.effects = new CollisionEffects(self);
  self.check_rect = function(var x, var y, var i)
  {
    var conditions = [false,false];
    if (x >= self.elements[i].x && x <= self.elements[i].x + self.elements[i].width)
    {
      conditions[0] = true;
    }
    if (y >= self.elements[i].y && y <= self.elements[i].y + self.elements[i].height)
    {
      conditions[1] = true;
    }
    if (conditions[0] == true && conditions[1] == true)
    {
      return true; 
    }
    else
    {
      return false;
    }
  };
  //Using the pythagorean theorm to do circle/mouse collision detection
  self.check_circle = function(var x,var y, var i)
  {
    var dy = y - (self.elements[i].y + self.elements[i].diameter / 2);
    var dx = x - (self.elements[i].x + self.elements[i].diameter / 2);
    var dm = Math.sqrt(dx * dx + dy * dy);
    if (dm <= self.elements[i].diameter)
    {
      return true;
    }
    else
    {
      return false;
    }
  };
  self.add = function(var object)
  {
    self.elements.push(object);
  };
  self.check = function(var x, var y)
  {
    for (var i = 0; i < self.elements.length; i++)
    {
      if (self.elements[i].type == 0 || self.elements[i].type == 3)
      {
	if (self.check_rect(x,y,i) == true)
	{
	  self.effects.check(self.elements[i]);
	}
      }
      else if(self.elements[i].type == 1)
      {
	if (self.check_circle(x,y,i) == true)
	{
	  self.effects.check(self.elements[i]);
	}
      }
    }
  };
  self.send = function(var object)
  {
    self.effects.check(object);
  };
}



function Collision()
{
  var self = this;
  self.rects = [];
  self.circles = [];
  self.radio_switch = RadioSwitch(self.circles);
  self.check = function(var x,var y)
  {
    var conditions = [false,false];
    for (var i = 0;i < self.rects.length;i++)
    {
      if (x >= self.rects[i].x && x <= self.rects[i].x + self.rects[i].width)
      {
	conditions[0] = true;
      }
      if (y >= self.rects[i].y && y <= self.rects[i].y + self.rects[i].height)
      {
	conditions[1] = true;
      }
      if (conditions[0] == true && conditions[1] == true)
      {
	return i;
      }
    }
    return -1;
  };
  //Using the pythagorean theorm to do circle/mouse collision detection
  self.check_circles = function(var x,var y)
  {
    for (var i = 0; i < self.circles.length; i++)
    {
      var dy = y - (self.circles[i].y + self.circles[i].diameter / 2);
      var dx = x - (self.circles[i].x + self.circles[i].diameter / 2);
      var dm = Math.sqrt(dx * dx + dy * dy);
      if (dm <= self.circles[i].diameter)
      {
	console.log("beep");
      }
    }
  };
  self.add_rect = function(var rect)
  {
    self.rects.push(rect);
  };
  self.add_circle = function(var circle)
  {
    self.circles.push(circle);
  };
}

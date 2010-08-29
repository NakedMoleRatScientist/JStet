

function Collision()
{
  var self = this;
  self.rects = [];
  self.circles = [];
  self.check = function(x,y)
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
  self.add_rect = function(rect)
  {
    self.rect.push(rect);
  };
  self.add_circle = function(var circle)
  {
    
  };
}
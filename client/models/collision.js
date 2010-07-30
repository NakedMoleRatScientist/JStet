

function Collision()
{
  var self = this;
  self.rect = [];
  self.check = function(x,y)
  {
    var conditions = [false,false];
    for (var i = 0;i < self.rect.length;i++)
    {
      if (x >= self.rect[i].x && x <= self.rect[i].x + self.rect[i].width)
      {
	conditions[0] = true;
      }
      if (y >= self.rect[i].y && y <= self.rect[i].y + self.rect[i].height)
      {
	conditions[1] = true;
      }
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
  self.add_rect = function(rect)
  {
    self.rect.push(rect);
  };
}


function Collision()
{
  var self = this;
  self.rect = [];
  self.check = function(x,y)
  {
    for (var i = 0;i < self.rect.length;i++)
    {
      if (x >= self.rect[i].x && x <= self.rect[i].x + self.rect[i].width)
      {
	return true;
      }
      if (y >= self.rect[i].y && y <= self.rect[i].y + self.rect[i].height)
      {
	return true;
      }
    }
    return false;
  };
  self.add_rect = function(rect)
  {
    self.rect.push(rect);
  };
}
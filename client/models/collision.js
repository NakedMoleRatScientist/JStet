

function Collision()
{
  var self = this;
  self.rect = [];
  self.check = function(x,y)
  {
    for (var i = 0;i < self.rect.length;i++)
    {
      if (x >= self.rect.x && x <= self.rect.x + self.rect.width)
      {
	return true;
      }
      if (y >= self.rect.y && y <= self.rect.y + self.rect.height)
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
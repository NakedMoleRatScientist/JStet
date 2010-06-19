

//Deal with score keeping.
function Score(net)
{
  var self = this;
  self.net = net;
  self.points = 0;
  self.minimum = 0;
  self.protocol = new ScoreProtocol(self);
  self.increase = function()
  {
    self.points ++;
  };
  self.changeMinimum = function(min)
  {
    if (min == false)
    {
      return false;
    }
    self.minimum = min;
  };
  self.toString = function()
  {
    return "Score: " + self.points;
  };
  self.reset = function()
  {
    self.points = 0;
  };
  self.check = function()
  {
    if (self.minimum == false & self.points != 0)
    {
      return true;
    }
    else if (self.minimum < self.points && self.points != 0)
    {
      return true;
    }
    return false;
  };
}
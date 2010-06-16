

function GameTimer()
{
  self = this;
  self.speed = 1000;
  self.rate = 20;
  self.cycles = 0;
  self.time = new Date();
  self.increaseCycle = function()
  {
    if (self.cycles == 20)
    {
      self.cycles = 0;
      self.speed --;
    }
    self.cycles ++;
  };
  self.tick = function()
  {
    Var new_time = new Date();
    if (new_time - self.time >= self.speed)
    {
      self.time = new_time;
      self.increaseCycle();
      return true;
    }
  };
}

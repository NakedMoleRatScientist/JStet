
function TimerAction()
{
  self = this;
  self.eclipsed = 0;
  self.speed = 1000;
  self.cycles = [];
  self.cycle = 0;
  self.limit = 20;
  self.time = new Date();
  self.tickCycle = function()
  {
    self.cycle++;
    if (self.cycle == self.limit)
    {
      self.limit--;
      self.cycle = 0;
    }
  };
  self.react = function()
  {
    var new_time = new Date();
    if (new_time - self.time >= self.speed)
    {
      self.time = new_time;
      self.tickCycle();
      self.eclipsed += 1; //As long as the speed is 1000, it'll be accurate
      return true;
    }
    return false;
  };
  self.reset = function()
  {
    self.cycle = 0;
    self.speed = 1000;
  };
  self.getSeconds = function()
  {
    return self.eclipsed;
  };
}
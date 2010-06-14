
function TimerAction()
{
  self = this;
  self.eclipsed = 0;
  self.speed = 1000;
  self.actions = [];
  self.cycle = 0;
  self.time = new Date();
  self.addAction = function(name , cycle)
  {
    self.actions.push([name,cycle]);
  };
  self.tickCycle = function()
  {
    self.cycle++;
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
  };
  self.getSeconds = function()
  {
    return self.eclipsed;
  };
}
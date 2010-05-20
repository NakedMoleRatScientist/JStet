
function TimerAction()
{
  this.speed = 1000;
  this.cycle = 0;
  this.time = new Date();
  this.tickCycle = function()
  {
    this.cycle++;
    if (this.cycle == 20)
    {
      this.speed - 1;
      this.cycle = 0;
    }
  },
  this.react = function()
  {
    var new_time = new Date();
    if (new_time - this.time >= 1000)
    {
      this.time = new_time;
      return true;
    }
    return false;
  }
}
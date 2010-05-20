
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
      this.speed--;
      this.cycle = 0;
    }
  },
  this.react = function()
  {
    var new_time = new Date();
    if (new_time - this.time >= this.speed)
    {
      console.log(speed);
      this.time = new_time;
      this.tickCycle();
      return true;
    }
    return false;
  },
  this.reset = function()
  {
    this.cycle = 0;
    this.speed = 1000;
  }
}
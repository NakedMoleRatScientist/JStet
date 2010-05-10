
function TimerAction()
{
  this.speed = 1000;
  this.time = new Date();
  this.react = function()
  {
    var new_time = new Date();
    if (new_time - this.time >= 1000)
    {
      console.log("time");
      this.time = new_time;
    }
  }
}
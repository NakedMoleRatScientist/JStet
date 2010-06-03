
function Score()
{
  this.points = 0;
  this.highest = 0;
  this.increase = function()
  {
    this.points ++;
  },
  this.changeHighest = function(min)
  {
    this.highest = min;
  }
  this.toString = function()
  {
    return "Score: " + this.points;
  }
  this.reset = function()
  {
    this.points = 0;
  }
  this.send = function()
  {
  }
}

function Score()
{
  this.points = 0;
  this.increase = function()
  {
    this.points ++;
  },
  this.toString = function()
  {
    return "Score: " + this.points;
  }
}
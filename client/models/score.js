
function Score()
{
  this.points = 0;
  this.mininum = 0;
  this.increase = function()
  {
    this.points ++;
  },
  this.changeMininum = function(min)
  {
    this.mininum = min;
  }
  this.toString = function()
  {
    return "Score: " + this.points;
  }
  this.reset = function()
  {
    this.points = 0;
  }
  this.check = function()
  {
    if (this.mininum == null || this.points > this.minium)
    {
      return true;
    }
    return false
  }
}
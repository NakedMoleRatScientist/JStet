

//Deal with score keeping.
function Score()
{
  this.points = 0;
  this.minimum = 0;
  this.network = new ScoreProtocol(this);
  this.network.initialize();
  this.increase = function()
  {
    this.points ++;
  },
  this.changeMinimum = function(min)
  {
    if (min == false)
    {
      return false;
    }
    this.minimum = min;
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
    if (this.minimum == false & this.points != 0)
    {
      return true;
    }
    else if (this.minimum < this.points && this.points != 0)
    {
      return true;
    }
    return false
  }
}

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
  this.reset = function()
  {
    this.points = 0;
  }
  this.send = function()
  {
    network.send("test: " + score);
  }
}
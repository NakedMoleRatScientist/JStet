
function PlayFieldDraw()
{
  var self = this;
  this.x = 50;
  this.y = 50;
  this.width = 200;
  this.height = 400;
  self.display = function()
  {
    rect(self.x,self.y,self.width,self.height);
    rect(self.x + self.width,self.y,100,self.height);
  };
}

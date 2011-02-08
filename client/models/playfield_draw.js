
function PlayFieldDraw()
{
  this.x = 50;
  this.y = 50;
  this.width = 200;
  this.height = 400;
  self.display = function()
  {
    rect(self.x,self.y,self.width,self.height);
  };
}

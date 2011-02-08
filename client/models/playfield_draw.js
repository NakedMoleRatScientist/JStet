
function PlayFieldDraw()
{
  var self = this;
  self.x = 50;
  self.y = 50;
  self.width = 200;
  self.height = 400;
  self.display = function(var x = 0, var y = 0)
  {
    rect(self.x,self.y,self.width,self.height);
    rect(self.x + self.width,self.y,100,self.height);
  };
}

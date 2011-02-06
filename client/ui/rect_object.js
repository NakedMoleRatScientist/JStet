
function RectObject(x,y,width,height)
{
  var self = this;
  self.ui = new UiObject(self,0);
  self.x = x;
  self.y = y;
  self.width = width;
  self.height = height;
  self.draw = function()
  {
    rect(self.x,self.y,self.width,self.height)
  };
}


function TextButton(var string,var size,var x, var y)
{
  var self = this;
  self.string = string;
  self.size = size;
  self.x = x;
  self.y = y;
  self.rect = new RectObject(x,y,size,size);
  self.display = function()
  {
    noFill();
    textFont(font,self.size / 2);
    text(self.string,self.x + 25,self.y - 25);
  };
}

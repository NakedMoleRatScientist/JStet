
function TextButton(var string,var size,var x, var y)
{
  var self = this;
  self.string = string;
  self.size = size;
  self.x = x;
  self.y = y;
  self.rect = new RectObject(x,y,size,size / 2);
  self.display = function()
  {
    noFill();
    textFont(font,self.size / 5);
    text(self.string,self.x + (self.size / 4),self.y + (self.size / 4));
    self.rect.draw();
  };
}

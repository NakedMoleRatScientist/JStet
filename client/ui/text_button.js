
function TextButton(var string,var size,var x, var y)
{
  var self = this;
  self.string = string;
  self.size = size;
  self.x = x;
  self.y = y;
  self.rect = new RectObject(x,y,size,size / 2);
  self.rect.type = 0;
  self.display = function()
  {
    noFill();
    textFont(font,self.size / 5);
    text(self.string,self.x + (size / 4),self.y + (size / 4));
    self.rect.draw();
  };
}

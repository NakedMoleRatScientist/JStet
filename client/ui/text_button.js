
function TextButton(var text,var size,var x, var y)
{
  var self = this;
  self.text = text;
  self.size = size;
  self.x = x;
  self.y = y;
  self.rect = new RectObject(x,y,size,size);
  self.display = function()
  {
    noFill();
    textFont(font,self.size / 2);
    text(self.text,self.x + 25,self.y -25);
  };
}

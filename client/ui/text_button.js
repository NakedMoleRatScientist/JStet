
function TextButton(var text,var size)
{
  var self = this;
  self.text = text;
  self.button = new RectObject(500,500,size,size);
  self.display = function()
  {
    noFill();
    textFont(font,self.size / 2);
  };
}

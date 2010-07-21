
function Text()
{
  var self = this;
  self.string = "";
  self.clean = function()
  {
    self.string = "";
  };
  self.addLetter = function(letter,limit)
  {
    if (self.string.length != limit)
    {
      self.string += letter;
    }
  };
  self.destroy = function()
  {
    if (self.string.length != 0)
    {
      self.string = self.string.substring(0,self.string.length - 1);
    }
  };
  self.get_text = function()
  {
    return self.string;
  };
}
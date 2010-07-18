
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
}
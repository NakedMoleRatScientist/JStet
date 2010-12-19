

function Pages()
{
  var self = this;
  self.page = [];
  self.on = 0;
  self.forward = function ()
  {
    self.on ++;
    if (self.on > self.pages - 1)
    {
      self.on --;
    }
  }
}



function Pages()
{
  var self = this;
  self.pages = [];
  self.on = 0;
  self.forward = function ()
  {
    self.on ++;
    if (self.on > self.pages - 1)
    {
      self.on --;
    }
  }
  self.backward = function ()
  {
    self.on --;
    if (self.on < 0)
    {
      self.on ++;
    }
  }
}

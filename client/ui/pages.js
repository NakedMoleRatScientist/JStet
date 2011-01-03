

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
  self.check = function(var n)
  {
    if (n == self.turn)
    {
      self.forward();
    }
  };
  self.backward = function ()
  {
    self.on --;
    if (self.on < 0)
    {
      self.on ++;
    }
  }
  self.run = function()
  {
    self.pages[self.on].call();
  };
  self.add = function(var object)
  {
    self.pages.push(object);
  };
}

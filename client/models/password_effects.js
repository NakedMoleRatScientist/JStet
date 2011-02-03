
function PasswordEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.status = 0;
  self.check = function(var object)
  {
    if (object.type == 3)
    {
      mode.change(7);
    }
    else if(object.type == 1)
    {
      if (object.member == 0)
      {
	self.status = 0;
      }
    }
  };
}


function PassEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.check = function(var object)
  {
    if (object.type == 2)
    {
      if (object.member == 0)
      {
	self.pages.data.update("password",self.pages.input.string);
	self.pages.act();
      }
      else
      {
	if (self.pages.data.get("password") == self.pages.input.string)
	{
	  console.log("success");
	}
      }
    }
  };
}

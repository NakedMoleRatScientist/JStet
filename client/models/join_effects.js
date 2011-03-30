
function JoinEffects(var page, var pages)
{
  var self = this;
  self.page = page;
  self.pages = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    switch (object.type)
    {
    case 0:
      if (object.member == 1)
      {
	self.pages.back();
      }
      else
      {
	if (self.pages.data.get("password") == false)
	{
	  join_protocol.request_join(self.pages.data.get("name"));
	}
	else
	{
	  self.pages.next();
	}
      }
      break;
    }
  };
}

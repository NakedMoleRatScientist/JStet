
function PassEffects(var pages, pass)
{
  var self = this;
  self.pass = pass;
  self.pages = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 2)
    {
      if (self.pass.state == 0)
      {
	self.pages.data.update("password",self.input.string);
	self.pages.act();
	self.pages.input.clean();
      }
      else
      {
	if (self.pages.data.get("password") == self.input.string)
	{
	  game_protocol.request_multi(self.pages.data.get("password"),self.pages.data.get("name"));
	  mode.change(7);
	}
	else
	{
	  self.pass.state = 2;
	}
      }
    }
    else if(object.type == 0)
    {
      if (self.pass.state == 2)
      {
	self.state = 0;
      }
    }
  };
}

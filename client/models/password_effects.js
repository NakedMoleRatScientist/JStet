
function PasswordEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.status = 0;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 3 && self.status == 1)
    {
      game_protocol.request_multi(self.pages.data.get("password"),self.pages.data.get("name"));
      mode.change(7);
    }
    else if(object.type == 1)
    {
      if (object.member == 0)
      {
	self.status = 0;
      }
      else if(object.member == 1)
      {
	self.status = 1;
      }
    }
  };
}

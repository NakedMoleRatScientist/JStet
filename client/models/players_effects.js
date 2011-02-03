
function PlayersEffects(var pages)
{
  var self = this;
  self.page = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 1)
    {
      if (object.member == 0)
      {
	self.page.data.update("players",1);
      }
      else
      {
	self.page.data.update("players",2);
      }
    }	
  };
}

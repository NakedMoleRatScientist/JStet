
function PlayersEffects(var pages)
{
  var self = this;
  self.page = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      if (object.member == 1)
      {
	self.update_players(object);
      }
    }
  };
}

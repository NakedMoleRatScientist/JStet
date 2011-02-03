
function PlayersEffects(var pages)
{
  var self = this;
  self.page = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 1)
    {
      self.update_players();
    }
    else if (object.type == 3)
    {
      self.end();
    }
  };
  self.update_players = function()
  {
    if (object.member == 0)
    {
      self.page.data.update("players",1);
    }
    else
    {
      self.page.data.update("players",2)
    }
  };
  self.end = function(var object)
  {
    if (object.type == 3)
    {
      if (self.page.data.get("players") == 1
      {
	console.log("end mode");
      }
    }
  };
}

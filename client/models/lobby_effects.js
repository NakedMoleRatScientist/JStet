
function LobbyEffects()
{
  var self = this;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      if (object.member == 0)
      {
	reset();
	game_protocol.request_game();
      }
      else if (object.member == 1)
      {
	mode.change(6);
      }
      else if (object.member == 2)
      {
	reset();
	list_protocol.request_size();
	list_protocol.request_games();
	mode.change(8);
      }
      else if (object.member == 3)
      {
	mode.change(2);
      }
    }
  };
}


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
	game_protocol.request_game();
	mode.change(4);
      }
      else if (object.member == 1)
      {
	mode.change(6);
      }
    }
  };
}

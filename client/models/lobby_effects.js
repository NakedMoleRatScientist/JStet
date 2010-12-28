
function LobbyEffects()
{
  var self = this;
  self.check = function(var n)
  {
    if (n == 0)
    {
      game_protocol.request_game();
      mode.change(4);
    }
    else if (n == 1)
    {
      mode.change(6);
    }
  };
  self.use = function(var collision)
  {
    self.collision = collision;
  };
}

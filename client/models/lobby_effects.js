
function LobbyEffects()
{
  var self = this;
  self.check = function(var n)
  {
    if (n == 0)
    {
      mode.change(4);
    }
  };
  self.use = function(var collision)
  {
    self.collision = collision;
  };
}

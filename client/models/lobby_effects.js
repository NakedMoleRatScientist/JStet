
function LobbyEffects()
{
  var self = this;
  self.counter = 0;
  self.rects = [];
  self.add = function(var button)
  {
    button.member = self.counter;
    self.counter ++;
    self.rects.push(button);
  };
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
  self.use = function(var collision)
  {
    self.collision = collision;
  };
}

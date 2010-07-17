
function Player(id)
{
  var self = this;
  self.id = id;
  self.nick = id;
}


exports.get_player = function(id)
{
  return new Player(id);
}
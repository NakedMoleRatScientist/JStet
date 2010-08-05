
function Player(id)
{
  var self = this;
  self.id = id;
  self.nick = id;

}

function PlayerGameMode(player)
{
  var self = this;
  self.player = player;
}

exports.get_player = function(id)
{
  return new Player(id);
}
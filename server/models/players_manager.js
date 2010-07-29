var player = require('./models/player');

var players = new Array();


exports.create = function(id)
{
  players.push(player.get_player(id));
};


exports.destroy = function(id)
{
  players.splice(exports.find_by_id(id),1);
}

exports.find_by_id = function(id)
{
  for (var i = 0;i < players.length;i++)
  {
    if (players[i].id == id)
    {
      return i;
    }
  }
};


exports.get = function()
{
  return players;
}
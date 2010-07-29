var player = require('./models/player');

var players = new Array();


exports.create = function(id)
{
  players.push(player.get_player(id));
}
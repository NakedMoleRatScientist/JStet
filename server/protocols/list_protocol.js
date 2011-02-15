var sys = require('sys');
var game = require('../protocols/game_protocol');


exports.find = function(data, id)
{
  sys.log(game.size());
}

function send(id)
{
  var player = players.get_player(id);
  return JSON.stringify([5,[0,game.size()]]);
}

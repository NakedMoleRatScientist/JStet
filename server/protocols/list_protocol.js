var sys = require('sys');
var game = require('../protocols/game_protocol');


exports.find = function()
{
  var data = [5,[0,game.size()]];
  return JSON.stringify(data);
}

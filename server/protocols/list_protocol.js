var sys = require('sys');
var game = require('../protocols/game_protocol');


exports.find = function()
{
  return JSON.stringify([5,[0,game.size()]]);
}

var sys = require('sys');
var game = require('../protocols/game_protocol');


exports.find = function()
{
  var data = [5,[0,game.size()]];
  return JSON.stringify(data);
}


exports.process_data = function(var request)
{
  if (request == 0)
  {
    return JSON.stringify(find());
  }
}

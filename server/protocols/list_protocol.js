var sys = require('sys');
var game = require('../protocols/game_protocol');


function size()
{
  var data = [5,[0,game.size()]];
  return data;
}


exports.process_data = function(var request)
{
  if (request == 0)
  {
    return JSON.stringify(size());
  }
}

var sys = require('sys');
var game = require('../protocols/game_protocol');


function size()
{
  var data = [5,[0,game.size()]];
  return data;
}

function names()
{
  var data = [5,[1,game.names()]];
  return data;
}

exports.process_data = function(var request)
{
  switch(request)
  {
  case 0:
    {
      return JSON.stringify(size());
    }
  }
}

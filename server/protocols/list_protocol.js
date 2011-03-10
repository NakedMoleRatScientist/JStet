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

function passwds()
{
  var data = [5,[2,games.passwds()]];
  return data;
}

exports.process_data = function(request)
{
  switch(request)
  {
  case 0:
    {
      return JSON.stringify(size());
    }
  case 1:
    {
      return JSON.stringify(names());
    }
  }
}

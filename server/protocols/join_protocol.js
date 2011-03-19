var sys = require('sys');
var game = require('../protocols/game_protocol');

function join(data)
{
  var authenticate = game.authenticate(data[2],data[3]);
  if (authenticate == true)
  {
    var data = [6,[0]];
  }
  else
  {
    var data = [6,[1,authenticate]];
  }
  return data;
}
exports.process_data = function(data)
{
  switch(data[1])
  {
  case 0:
    {
      return JSON.stringify(join(data));
    }
  }
}

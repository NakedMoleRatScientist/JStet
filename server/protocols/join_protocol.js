var sys = require('sys');
var game = requrie('../protocols/game_protocol');

function join(data)
{
  return game.authenticate(data[1],data[2]);
}
exports.process_data = function(data)
{
  switch(data[0])
  {
  case 0:
    {
      return JSON.stringify(join(data));
    }
  }
}

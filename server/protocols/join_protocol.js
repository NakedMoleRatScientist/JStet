var sys = require('sys');
var game = requrie('../protocols/game_protocol');

function join(data)
{
  game.authenticate(name,pass);
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

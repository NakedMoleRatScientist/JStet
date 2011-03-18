var sys = require('sys');
var game = requrie('../protocols/game_protocol');

function join(data)
{
  var data = [6,[0,game.authenticate(data[1],data[2]]]);
  return data;
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

var sys = require('sys');
var game = requrie('../protocols/game_protocol');

function join(data,id)
{
  var authenticate = game.authenticate(data[1],data[2],id);
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
exports.process_data = function(data,id)
{
  switch(data[0])
  {
  case 0:
    {
      return JSON.stringify(join(data,id));
    }
  }
}

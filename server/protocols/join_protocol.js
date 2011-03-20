var sys = require('sys');
var game = require('../protocols/game_protocol');

function join(data,id)
{
  //data[2] is name, data[3] is pass
  var authenticate = game.authenticate(data[2],data[3],id);
  if (authenticate == false)
  {
    var data = [6,[0]];
  }
  else
  {
    //since we authenticate an existing game session, the id for player joining the game come last, thus authenticate[1] first and then authenticate[0] last;
    var data = [6,[1,authenticate[1],authenticate[0]]];
  }
  return data;
}

exports.process_data = function(data,id)
{
  switch(data[1])
  {
  case 0:
    {
      //swapping details for ability to send data to two players in slightly different arrangement
      var join_data = join(data,id);
      var swap = join_data[2];
      var swap_2 = join_data[3];
      var second = [6,[1,swap_2,swap]];
      return [join_data,second];
    }
  }
}

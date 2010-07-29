var sys = require('sys');
var lobby = require('../modes/lobby');
var players = require('../models/players_manager');

exports.process = function(data,id)
{
  var player = players.get_player(id);
  switch(data[1])
  {
  case 1:
    return JSON.stringify([1,[1,player.nick + ": " + data[2]]]);
    break;
  case 2:
    var list = players.get();
    for (var i = 0;i < list.length; i++)
    {
      if(list[i].nick == data[2])
      {
	return JSON.stringify([1,[2]]);
      }
    }
    player.nick = data[2];
    return JSON.stringify([1,[3]]);
    break;
  }
}
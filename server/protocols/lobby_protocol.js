var sys = require('sys');
var lobby = require('../modes/lobby');
var players = require('../models/players_manager');

exports.process = function(data,id)
{
  switch(data[1])
  {
  case 1:
    return JSON.stringify([1,[1,player.nick + ": " + data[2]]]);
    break;
  case 2:
    player.nick = data[2];
    return -1;
    break;
  }
}
var sys = require('sys');
var lobby = require('../models/lobby');


exports.process = function(data,player)
{
  switch(data[1])
  {
  case 1:
    return player.name + data[2];
    break;
  }
}
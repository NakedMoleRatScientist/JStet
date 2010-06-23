var sys = require('sys');
var game = require('../modes/game_loop')

exports.process = function(data)
{
  switch(data)
  {
  case 0:
      game.initializeLoop();
      break;
  }
};
  



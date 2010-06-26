var sys = require('sys');
var game = require('../modes/game_loop')
var events = new Array();
exports.process = function(data)
{
  switch(data)
  {
  case 0:
    game.initializeLoop();
    return game.get_data();
    break;
  }
};
  



var sys = require('sys');
var game = require('../modes/game_loop')
var events = new Array();

function Session()
{
  var self = this;
}

exports.process = function(data)
{
  switch(data)
  {
  case 0:
    game.initialize();
    add_events(game.get_data());
    game.run_game();
    break;
  case 1:
    sys.log("Reaction clear.");
    clear();
    break;
  }
};

function add_events(loop_events)
{
  for (i = 0; i < loop_events.length; i++)
  {
    events.push([2,loop_events[i]]);
  }
}


exports.get_data = function()
{
  return events;
}


function clear()
{
  events.shift();
}
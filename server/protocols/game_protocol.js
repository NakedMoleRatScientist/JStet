var sys = require('sys');
var game = require('../modes/game_loop')
var sessions = new Array();

function Session()
{
  var self = this;
  self.events = new Array();
  self.id = null;
  self.game = require('../modes/game_loop');
  self.initialize = function(id)
  {
    self.id = id;
    game.initialize();
    add_events(game.get_data());
    game.run_game();
  };
  self.add_events = function(loop_events)
  {
    for (i = 0; i < loop_events.length; i++)
    {
      events.push([2,loop_events[i]]);
    }
  };
  self.clear = function()
  {
    events.shift();
  };
}

exports.process = function(data,id)
{
  switch(data)
  {
  case 0:
    game.initialize();
    add_events(game.get_data());
    game.run_game()
    break;
  case 1:
    sys.log("Reaction clear.");
    clear();
    break;
  }
};

exports.get_data = function()
{
  return events;
}


function clear()
{
  events.shift();
}
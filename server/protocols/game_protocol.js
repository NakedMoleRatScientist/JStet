var sys = require('sys');
var sessions = new Array();
var game = require('../modes/game_loop');
function Session()
{
  var self = this;
  self.events = new Array();
  self.id = null;
  self.game = game.create_new();
  self.initialize = function(id)
  {
    self.id = id;
    self.game.initialize();
    self.add_events(self.game.get_data());
    self.game.run_game();
  };
  self.add_events = function(loop_events)
  {
    for (i = 0; i < loop_events.length; i++)
    {
      self.events.push([2,loop_events[i]]);
    }
  };
  self.update_events = function()
  {
    self.add_events(self.game.get_data());
  };
  self.clear = function()
  {
    self.events.shift();
  };
  self.get_data = function()
  {
    return self.events;
  };
}

exports.process = function(data,id)
{
  switch(data)
  {
  case 0:
    sys.log("Game created.");
    new_game = new Session();
    new_game.initialize(id);
    sessions.push(new_game);
    break;
  case 1:
    sys.log("Reaction clear.");
    sessions[find_by_id(id)].clear();
    break;
  }
};

function find_by_id(id)
{
  for (i = 0;i < sessions.length;i++)
  {
    if (id == sessions[i].id)
    {
      return i;
    }
  }
  return -1;
}

exports.get_data = function(id)
{
  location = find_by_id(id);
  if (location == -1)
  {
    return false;
  }
  sessions[location].update_events();
  return sessions[location].get_data();
}


exports.destory = function(id)
{
  location = find_by_id(id);
  sessions.splice(location,1); 
}
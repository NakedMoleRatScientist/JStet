var sys = require('sys');
var sessions = new Array();
var game = require('../modes/game_loop');
var players = require('../models/players_manager');
function Session()
{
  var self = this;
  self.events = new Array();
  self.id = null;
  self.game = game.create_new();
  self.initialize = function(id)
  {
    self.id = id;
    self.add_events([[self.id,0]]); //0 tell the client to initialize game mode.
    self.game.initialize(id);
    self.add_events(self.game.get_data());
    self.game.run_game();
  };
  self.move_right = function(id)
  {
    self.game.move_right(id);
  };
  self.move_left = function()
  {
    self.game.move_left();
  };
  self.move_down = function()
  {
    self.game.move_down();
  };
  self.rotate = function()
  {
    self.game.rotate();
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
    self.events = new Array();
  };
  self.get_data = function()
  {
    return self.events;
  };
  self.get_score = function()
  {
    return self.game.score;
  };
}

exports.process = function(data,id)
{
  switch(data[1])
  {
  case 0:
    sys.log("Game created.");
    new_game = new Session();
    new_game.initialize(id);
    sessions.push(new_game);
    break;
  case 1:
    sys.log("Reaction clear.");
    break;
  case 2:
    sys.log("Movement instruction received");
    move(id,data[2]);
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

function move(id,type)
{
  location = find_by_id(id);
  if (location == -1)
  {
    return false;
  }
  switch(type)
  {
  case 1:
    sessions[location].move_right(id);
    break;
  case 2:
    sessions[location].move_left(id);
    break;
  case 3:
    sessions[location].move_down();
    break;
  case 4:
    sessions[location].rotate();
    break;
  }
}

exports.get_data = function(id)
{
  var location = find_by_id(id);
  if (location == -1)
  {
    return false;
  }
  sessions[location].update_events();
  var data = sessions[location].get_data();
  sessions[location].clear();
  return data;
}


exports.get_sessions = function()
{
  return sessions;
}

exports.get_score = function(id)
{
  var location = find_by_id(id)
  if (location == -1)
  {
    return false;
  }
  var score = sessions[location].get_score();
  return score;
}


exports.destroy = function(id)
{
  var location = find_by_id(id);
  if (location == -1)
  {
    return false;
  }
  sys.log("Destroyed game: " + id);
  sessions[location].over = true;
  sessions.splice(location,1); 
}
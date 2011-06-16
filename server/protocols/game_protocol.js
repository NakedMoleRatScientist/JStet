var sys = require('sys');
var sessions = new Array();
var game = require('../modes/game_loop');
var players = require('../models/players_manager');
function Session()
{
  var self = this;
  self.events = new Array();
  self.ids = new Array();
  self.name = null;
  self.password = null;
  self.players = 1;
  self.confirm = [false,false];
  self.game = game.create_new();
  self.initialize = function()
  {
    self.add_event([2,0,self.ids]); //0 tell clients to initalize game mode.
    self.game.initialize(self.ids);
    self.update_events();
  };
  self.move_right = function(id)
  {
    self.game.move_right(id);
  };
  self.move_left = function(id)
  {
    self.game.move_left(id);
  };
  self.move_down = function(id)
  {
    self.game.move_down(id);
  };
  self.rotate = function(id)
  {
    self.game.rotate(id);
  };
  self.add_event = function(loop_events)
  {
    self.events.push([2,loop_events]);
  };
  //add all the new events that happened in the game. 
  self.update_events = function()
  {
    var data = self.game.get_data();
    if (data.length != 0)
    {
      for (var i = 0; i < data.length; i++)
      {
	self.add_event(data[i]);
      }
    }
  };
  //clear all the old events.
  self.clear = function()
  {
    self.events = new Array();
  };
  //get all the individual events of that session.
  self.get_data = function()
  {
    return self.events;
  };
  self.get_score = function(id)
  {
    return self.game.get_score(id);
  };
  self.run = function()
  {
    self.game.run_game();
  };
  self.authenticate = function(password,id)
  {
    if (password == self.password)
    {
      self.push_id(id);
      return self.ids;
    }
    return false;
  };
  self.push_id = function(id)
  {
    self.ids.push(id);
  };
  self.find_by_id = function(id)
  {
    for (var i = 0; i < self.ids.length; i++)
    {
      if (self.ids[i] == id)
      {
	return i;
      }
    }
    return -1;
  };
  self.ready = function(id)
  {
    var n = self.find_by_id(id);
    self.confirm[n] = true;
    if (self.ids.length == 2)
    {
      if (self.confirm[0] == true && self.confirm[1] == true)
      {
	sys.log("Engaging game loop initialization...");
	self.initialize();
	self.add_event([2,8]);
      }
      else
      {
	sys.log("A player is ready to rumble!");
	self.add_event([2,9,id]);
      }
    }
    else if(self.confirm[0] == true)
    {
      sys.log("Engaging game loop initialization...");
      self.add_event([2,8]);
    }
  };
}

exports.process = function(data,id)
{
  switch(data[1])
  {
  case 0:
    if (find_by_id(id) != -1)  //Find if a game session already exists and deny.
    {
	sys.log("ye reject me!");
      return;
    }
    sys.log("Single player game created.");
    create_game(id,1,"single_player: " + id,null,true);
    break;
  case 1:
    sys.log("Reaction clear.");
    break;
  case 2:
    sys.log("Movement instruction received");
    move(id,data[2]);
    break;
  case 3:
    sys.log("Custom game created.");
    create_game(id,2,data[2],data[3],false);
    break;
  case 4:
    sys.log("Game is running");
    sessions[find_by_id(id)].run();
    break;
  case 5:
    sys.log("Ready for action!");
    sessions[find_by_id(id)].ready(id);
    break;
  case 6:
    sys.log("Multiplayer nopassword created");
    create_game(id,2,"Game_" + id,null,false);
    break;
  case 7:
    sys.log("Attempt kill");
    exports.destroy_game(id);
    break;
  }
};

function create_game(id, games, name, password, init)
{
  var new_game = new Session();
  new_game.push_id(id);
  new_game.players = games;
  new_game.name = name;
  new_game.password = null;
  if (init == true)
  {
    new_game.initialize();
  }
  sessions.push(new_game);
}
function find_by_name(name)
{
  for (var i = 0;i < sessions.length;i++)
  {
    if(sessions[i].name == name)
    {
      return i;
    }
  }
  return -1;
}

function find_by_id(id)
{
  for (var i = 0;i < sessions.length;i++)
  {
    for(var o = 0;o < sessions[i].ids.length;o++)
    {
      if (sessions[i].ids[o] == id)
      {
	return i;
      }
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
    sessions[location].move_down(id);
    break;
  case 4:
    sessions[location].rotate(id);
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
  var location = find_by_id(id);
  if (location == -1)
  {
    return false;
  }
  var score = sessions[location].get_score(id);
  return score;
}

exports.destroy_game = function(id)
{
  var location = sessions[find_by_id(id)];
  if (location)
    {
	if (location.game.over_status == true || location.game.players.size == 1)
	{
	  sessions.splice(location,1);
	  sys.log("Destroy game: " + id);
	}
	else
	{
	  location.game.pop_id(id);
	}
    }
 
}

exports.size = function()
{
  return sessions.length;
}

exports.games = function()
{
  var games = [];
  for (var i = 0; i < sessions.length; i++)
  {
    if (sessions[i].players == 2)
    {
      var pass = false;
      if (sessions[i].password != null)
      {
	pass = true;
      }
      games.push([sessions[i].name,pass]);
    }
  }
  return games;
}


exports.authenticate = function(name,pass,id)
{
  return sessions[find_by_name(name)].authenticate(pass,id);
}

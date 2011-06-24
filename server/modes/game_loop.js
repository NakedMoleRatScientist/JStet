var sys = require('sys');
var tetro = require('../models/tetromino');

var timer = require('../models/timer');
var field = require('../models/playfield');
var db = require('../models/database');
var player = require('../models/player');
var players = require('../models/players_manager');
function EventManager()
{
  var self = this;
  self.events = new Array();
  self.players = new Array();
  self.timer = timer.create_new();
  self.send = function(message)
  {
    //by default, each new message first array element contain the player's id.
    self.events.push(message);
  };
  self.over_status = function()
  {
    for (var i = 0; i < self.players.length; i++)
    {
      if (self.players[i].over == false)
      {
	return true;
      }
    }
    return false;
  };
  self.initialize = function(ids)
  {
    for (var i = 0; i < ids.length; i++)
    {
      var identity = players.get_player(ids[i]);
      var new_player = player.get_game(identity,self);
      new_player.initialize();
      self.players.push(new_player);
    }
  };
  self.get_data = function()
  {
    var message = self.events;
    self.events = [];
    return message;
  };
  self.find_by_id = function(id)
  {
    for (var i = 0; i < self.players.length;i++)
    {
      if (self.players[i].player.id == id)
      {
	return self.players[i];
      }
    }
  };
  //move right command to player
  self.move_right = function(id)
  {
    var player = self.find_by_id(id);
    player.move_right();
  };
  //move left command to player
  self.move_left = function(id)
  {
    var player = self.find_by_id(id);
    player.move_left();
  };
  //move down command to player
  self.move_down = function(id)
  {
    var player = self.find_by_id(id);
    player.move_down();
  };
  //rotate shape
  self.rotate = function(id)
  {
    var player = self.find_by_id(id);
    player.rotate();
  };
 
  self.get_score = function(id)
  {
    var player = self.find_by_id(id);
    return player.score;
  };

  self.over_check = function()
  {
    var game_over = 0;
    //All game over, meaning the game is terminated.
    for (var i = 0; i < self.players.length; i++)
    {
      if (self.players[i].over == true)
      {
	game_over ++;
      }
    }
    if (game_over == self.players.length)
    {
      clearInterval(game);
    }
  };
  self.player_run = function()
  {
    for (var i = 0; i < self.players.length; i++)
    {
      if (self.players[i].over != true)
      {
	sys.log("tweet");
	self.players[i].move_down();
      }
    }
  };
  //run a game loop
  self.run_game = function()
  {
    var game = setInterval(function() {
      if (self.timer.react() == true)
      {
	self.player_run();

      }
    },10);
  }
}

exports.create_new = function()
{
  return new EventManager();
}

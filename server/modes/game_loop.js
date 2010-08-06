var sys = require('sys');
var tetro = require('../models/tetromino');

var timer = require('../models/timer');
var field = require('../models/playfield');
var db = require('../models/database');
var player = require('../models/player')
function EventManager(id)
{
  var self = this;
  self.events = new Array();
  self.id = id;
  self.players = new Array();
  self.timer = timer.create_new();
  self.create_shape_message = function (shape,type,choice)
  {

    self.events.push(message);
  };
  self.send = function(message)
  {
    self.events.push(message);
  };
  //Current shape just ended. Time to time cycle through
  
  self.cycle_message = function(id)
  {

  };
  //Send data about current's movement.
  self.create_xy_message = function()
  {
    var message = [2,self.current.x,self.current.y];
    self.events.push(message);
  };
  self.create_rotate_message = function()
  {
    var message = [3,self.current.choice];
    self.events.push(message);
  };
  self.create_over_message = function()
  {
    var message = [6,1];
    self.events.push(message);
  };
  self.create_success_message = function()
  {
    var message = [7,1]
    self.events.push(message);
  };
  //get the initial shapes for current and future.
  self.initialize = function(play)
  {
    var new_player = player.get_game(play,self);
    new_player.initialize();
    self.players.push(new_player);
  };
  self.get_data = function()
  {
    var message = self.events;
    self.events = [];
    return message;
  };
  //move right
  self.move_right = function()
  {
    self.current.move(20,0);
    self.collision_effect_sideway(20,0);
    self.create_xy_message();
  };
  //move left
  self.move_left = function()
  {
    self.current.move(-20,0);
    self.collision_effect_sideway(-20,0);
    self.create_xy_message();
  };
 
  self.collision_effect_sideway = function(x,y)
  {
    if (self.collision(x,y))
    {
      self.current.move(-x,-y);
    }
  };
  //move down
  
  //rotate shape
  self.rotate = function()
  {
    self.current.rotate();
    self.collision_rotate_effect();
    self.create_rotate_message();
  };
  self.collision_rotate_effect = function()
  {
    if (self.collision(0,0))
    {
      self.current.rotate_backward();
    }
  };
  //Check if score beat the lowest high score on the chart.
  self.check_score = function()
  {
    if (db.get_lowest(self.score) < self.score)
    {
      return true;
    }
    return false;
  };
  //run a game loop
  self.run_game = function()
  {
    var game = setInterval(function() {
      if (self.timer.react() == true)
      {
	var game_over = 0;
	for (var i = 0;i < self.players.length;i++)
	{
	  if (self.players[i].move() == true)
	  {
	    game_over += 1;
	  }
	}
	if (game_over == 2)
	{
	  clearInterval(game);
	}
      }
    },10);
  }
}

exports.create_new = function()
{
  return new EventManager();
}

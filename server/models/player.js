var tetro = require('../models/tetromino');
var field = require('../models/playfield');
var generator = require ('../models/shape_generator');
var sys = require('sys');
var db = require('../models/database');
function Player(id)
{
  var self = this;
  self.id = id;
  self.nick = id;
}

function PlayerGameMode(player,manager)
{
  var self = this;
  self.player = player;
  self.manager = manager;
  self.current = tetro.get_tetromino();
  self.future = tetro.get_tetromino();
  self.field = field.get_field();
  self.over = false;
  self.score = 0;
  self.create_over_message = function()
  {
    var message = [self.player.id,6,1];
    self.events.push(message);
  };
  //kill some line.
  self.create_field_message = function(clean)
  {
    var message = [self.player.id,4,line];
    self.manager.send(message);
  };
  //give us idea of what the score is.
  self.create_score_message = function()
  {
    var message = [self.player.id,5,self.score];
    self.manager.send(message);
  };
  self.create_shape_message = function(shape,type,choice)
  {
    //first element denotate what player should recevie the information...
    //In the second element denotates incoming new shape
    //The third element indicate the which type of shape
    //The fourt element contains the shape's rotation
    //The last element contain an integer variable called type, which indicate if the shape is a current or a future.
    var message = [self.player.id,1,shape.name,shape.get_data(choice),type];
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
  //check for collision
  self.collision = function(x,y)
  {
    var offset = self.field.calculate_positions(self.current.x,self.current.y);
    if (self.field.check(self.current.get_list(),offset[0],offset[1]) == false)
    {
      return true;
    }
    return false;
  };
  //If collision, then revert position. It can also declare game over if self.current.y is 0.
  self.collision_effect_down = function(x,y)
  {
      if (self.collision(x,y))
    {
      self.current.move(-x,-y);
      if (self.current.y == 0)
      {
	self.over = true;
	sys.log("Game over.");
      }
      self.cycle();
    }
  };
  self.cycle_message = function()
  {
    self.create_shape_message(self.current.get_shape(),0,self.current.get_choice()); //0 is current
    self.create_shape_message(self.future.get_shape(),1,self.future.get_choice());  //1 is the future
  };
  self.cycle = function()
  {
    self.field.insert_blocks(self.current.get_list(),self.current.x,self.current.y);
    self.current.return_to_zero();
    self.current.change_shape(self.future.get_shape());
    self.future.change_shape(generator.get_shape());
    var status = true;
    self.cycle_message();
    while(status)
    {
      var clean = self.field.clear_line(self.field.check_field());
      status = self.field.move_lines(clean);
      if (clean != false)
      {
	self.score += 1;
	self.create_field_message(clean);
      }
    }
    self.create_score_message();
  };
  self.move_down = function()
  {
    if (self.current.move(0,20) == 2) //2 indicate that it reached rock 
    {
      self.cycle();
    }
    self.collision_effect_down(0,20);
  };
  self.move = function()
  {
    self.move_down()
    if (self.over == true)
    {
      if (self.check_score() == true)
      {
	self.create_success_message();
      }
      else
      {
	self.create_over_message();
      }
      return true;
    }
    return false;
  };
  self.initialize = function()
  {
    self.current.change_shape(generator.get_shape());
    self.future.change_shape(generator.get_shape());
    self.cycle_message();
  };
}

exports.get_player = function(id)
{
  return new Player(id);
}

exports.get_game = function(player,manager)
{
  return new PlayerGameMode(player,manager);
}
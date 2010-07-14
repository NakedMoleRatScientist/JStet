var sys = require('sys');
var tetro = require('../models/tetromino');
var generator = require ('../models/shape_generator');
var timer = require('../models/timer');
var field = require('../models/playfield');
function EventManager(id)
{
  var self = this;
  self.events = new Array();
  self.id = id;
  self.timer = timer.create_new();
  self.current = tetro.get_tetromino();
  self.future = tetro.get_tetromino();
  self.field = field.get_field();
  self.over = false;
  self.score = 0;
  self.create_shape_message = function (shape,type,choice)
  {
    //1 in the first element denotates incoming new shape
    //The second element indicate the which type of shape
    //The third element contains the shape's rotation
    //The last element contain an integer variable called type, which indicate if the shape is a current or a future.
    var message = [1,shape.name,shape.get_data(choice),type];
    self.events.push(message);
  };
  //Current shape just ended. Time to time cycle through
  self.cycle = function()
  {
    self.field.insert_blocks(self.current.get_list(),self.current.x,self.current.y);
    self.current.return_to_zero();
    self.current.change_shape(self.future.get_shape());
    self.future.change_shape(generator.getShape());
    var status = true;
    while(status)
    {
      var clean = self.field.clear_line(self.field.check_field());
      status = self.field.move_lines(clean);
      self.score += 1;
      self.create_field_message(clean);
    }
  };
  self.cycle_message = function()
  {
    self.create_shape_message(self.current.get_shape(),0,self.current.get_choice()); //0 is current
    self.create_shape_message(self.future.get_shape(),1,self.future.get_choice());  //1 is the future
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
  self.create_field_message = function(line)
  {
    var message = [4,line];
    self.events.push(message);
  };
  self.create_score_message = function()
  {
    var score = [5,self.score];
    self.events.push(message);
  };
  self.final_dest_message = function()
  {
    var message = [6,self.current.x,self.current.y];
    self.events.push(message);
  };
  //get the initial shapes for current and future.
  self.initialize = function()
  {
    self.current.change_shape(generator.getShape());
    self.future.change_shape(generator.getShape());
    self.cycle_message();
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
    self.create_xy_message();
  };
  //move left
  self.move_left = function()
  {
    self.current.move(-20,0);
    self.create_xy_message();
  };
  //check for collision
  self.collision = function(x,y)
  {
    var offset = self.field.calculate_positions(self.current.x,self.current.y);
    if (self.field.check(self.current.get_list(),offset[0],offset[1]) == false)
    {
      self.current.move(-x,-y);
      return true;
    }
    return false;
  };
  //If collision, then revert position. It can also declare game over if self.current.y is 0.
  self.collision_effect = function(x,y)
  {
    if (self.collision(x,y))
    {
      if (self.current.y == 0)
      {
	self.over = false;
      }
      self.cycle();
      self.cycle_message();
    }
  };
  //move down
  self.move_down = function()
  {
    if (self.current.move(0,20) == 2) //2 indicate that it reached rock bottom.
    {
      self.cycle();
      self.cycle_message();
      self.final_dest_message();
    }
  };
  //rotate shape
  self.rotate = function()
  {
    self.current.rotate();
    self.create_rotate_message();
  };
  //run a game loop
  self.run_game = function()
  {
    setInterval(function() {
      if (self.timer.react() == true)
      {
	sys.log("Move down.");
	self.move_down();
	self.collision_effect(0,20);
	self.create_xy_message();
      }
    },10);
  }
}

exports.create_new = function()
{
  return new EventManager();
}





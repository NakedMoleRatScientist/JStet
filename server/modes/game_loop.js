var sys = require('sys');
var tetro = require('../models/tetromino');
var generator = require ('../models/shape_generator');
var timer = require('../models/timer')

function EventManager(id)
{
  var self = this;
  self.events = new Array();
  self.id = id;
  self.timer = timer.create_new();
  self.current = tetro.get_tetromino();
  self.future = tetro.get_tetromino();
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
    self.current.change_shape(self.future.get_shape());
    self.future.change_shape(generator.getShape());
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
  //get the initial shapes for current and future.
  self.initialize = function()
  {
    self.current.change_shape(generator.getShape());
    self.future.change_shape(generator.getShape());
    
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
  //move down
  self.move_down = function()
  {
    if (self.current.move(0,20) == 2)
    {
      sys.log("Y reached!");
    }
    self.create_xy_message();
  };
  //rotate shape
  self.rotate = function()
  {
    self.current.rotate();
    self.create_xy_message();
  };
  //run a game loop
  self.run_game = function()
  {
    setInterval(function() {
      if (self.timer.react() == true)
      {
	sys.log("Move down.");
	self.move_down();
      }
    },10);
  }
}

exports.create_new = function()
{
  return new EventManager();
}





var sys = require('sys');
var tetro = require('../models/tetromino');
var generator = require ('../models/shape_generator');

var sessions = new Array();

function EventManager(id)
{
  var self = this;
  self.events = new Array();
  self.id = id;
  self.current = tetro.get_tetromino();
  self.future = tetro.get_current();
  self.create_shape_message = function (shape,type)
  {
    //1 in the first element denotates incoming new shape
    //The second element indicate the which type of shape
    //The third element contains the shape's rotation
    //The last element contain an integer variable called type, which indicate if the shape is a current or a future.
    var message = [1,shape.name,shape.get_choice(),type];
    self.events.push(message);
  }
  //Send data about current's movement.
  self.create_xy_message = function()
  {
    var message = [2,self.current.x,self.current.y];
    self.events.push(message);
  }
  //get the initial shapes for current and future.
  self.initialize = function()
  {
    self.current.change_shape(generator.getShape());
    self.future.change_shape(generator.getShape());
    self.create_shape_message(current.get_shape(),0); //0 is current
    self.create_shape_message(future.get_shape(),1);  //1 is the future
  }
  exports.get_data = function()
  {
    message = events;
    events = [];
    return message;
  }
}

exports.initialize = function(id)
{
  var game = new EventManager(id);
  game.initialize();
  sessions.push(game);
}


exports.run_game = function()
{
  setInterval(function() { }, 10);
}





exports.move_right = function()
{
  current.move(20,0);
  create_xy_message();
}


exports.move_left = function()
{
  current.move(-20,0);
  create_xy_message();
}


exports.move_down = function()
{
  current.move(0,20);
  create_xy_message();
}


exports.rotate = function()
{
  current.rotate();
  create_xy_message();
}
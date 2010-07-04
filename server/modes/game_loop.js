var sys = require('sys');
var tetro = require('../models/tetromino');
var current = tetro.get_tetromino();
var future = tetro.get_tetromino();
var generator = require ('../models/shape_generator');

var events = new Array();

function create_shape_message(shape,type)
{
  //1 in the first element denotates incoming new shape
  //The second element indicate the which type of shape
  //The third element contains the shape's rotation
  //The last element contain an integer variable called type, which indicate if the shape is a current or a future.
  message = [1,shape.name,current.get_choice(),type];
  events.push(message);
}

function create_xy_message()
{
  message = [2,current.x,current.y];
  events.push(message);
}

exports.initialize = function()
{
  current.change_shape(generator.getShape());
  future.change_shape(generator.getShape());
  create_shape_message(current.get_shape(),0); //0 being current
  create_shape_message(future.get_shape(),1);  //1 is the future
}


exports.run_game = function()
{
  setInterval(function() { }, 10);
}


exports.get_data = function()
{
  message = events;
  events = [];
  return message;
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
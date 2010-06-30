var sys = require('sys');
var current = require('../models/tetromino');
var future = require('../models/tetromino');
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


exports.initialize = function()
{
  current.change_shape(generator.getShape());
  future.change_shape(generator.getShape());
  create_shape_message(current.get_shape());
  create_shape_message(future.get_shape());
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
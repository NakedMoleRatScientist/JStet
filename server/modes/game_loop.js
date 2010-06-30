var sys = require('sys');
var current = require('../models/tetromino');
var future = require('../models/tetromino');
var generator = require ('../models/shape_generator');

var events = new Array();

function create_current_event()
{
  shape = current.get_shape();
  message = [1,shape.name,current.get_choice()];
  events.push(message);
}


exports.initialize = function()
{
  current.change_shape(generator.getShape());
  future.change_shape(generator.getShape());
  create_current_event();
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
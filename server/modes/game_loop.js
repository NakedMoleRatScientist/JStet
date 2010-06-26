var sys = require('sys');
var current = require('../models/tetromino');
var future = require('../models/tetromino');
var generator = require ('../models/shape_generator');

var data = new Array();

function shapeData()
{
  shape = current.get_shape();
  message = [1,shape.name,current.get_choice];
  data.push(message);
}


exports.initializeLoop = function()
{
  current.change_shape(generator.getShape());
  future.change_shape(generator.getShape());
  shapeData();
  var state = true;
  while (state == true)
  {
  }
}


exports.get_data = function()
{
  return data;
  data = new Array();
}
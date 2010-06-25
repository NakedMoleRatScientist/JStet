var sys = require('sys');
var current = require('../models/tetromino');
var future = require('../models/tetromino');
var generator = require ('../models/shape_generator');

exports.initializeLoop = function()
{
  current.change_shape(generator.getShape());
  future.change_shape(generator.getShape());
  var state = true;
  while (state == true)
  {
  }
}
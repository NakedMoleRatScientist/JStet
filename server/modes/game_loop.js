var sys = require('sys');
var current = require('../models/tetromino');
var future = require('../models/tetromino');
var generator = require ('../models/shape_generator');

var data = new Array();


exports.initializeLoop = function()
{
  current.change_bbbshape(generator.getShape());
  future.change_shape(generator.getShape());
  var state = true;
  while (state == true)
  {
  }
}
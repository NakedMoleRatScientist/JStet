var sys = require('sys');
var current = require('../models/tetromino');
var future = require('../models/tetromino');
var generator = require ('..models/shape_generator');

exports.initializeLoop = function()
{
  current.modify_bulk(generator.getShape());
  future.modify_bulk(generator.getShape());
  var state = true;
  while (state == true)
  {
  }
}
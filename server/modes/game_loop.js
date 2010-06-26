var sys = require('sys');
var current = require('../models/tetromino');
var future = require('../models/tetromino');
var generator = require ('../models/shape_generator');

var data = new Array();

function shapeData()
{
  shape = current.getShape();
  message = [1,shape.name,current.getChoice]
}


exports.initializeLoop = function()
{
  current.change_shape(generator.getShape());
  future.change_shape(generator.getShape());
  var state = true;
  while (state == true)
  {
  }
}
var ishape = require('../models/i_shape');
var lshape = require('../models/l_shape');
var sshape = require('../models/s_shape');
var oshape = require('../models/o_shape');
var zshape = require('../models/z_shape');
var jshape = require('../models/j_shape');
var tshape = require('../models/t_shape');
function randomChoice()
{
  return Math.floor(Math.random() * 7);
}


exports.getShape = function()
{
  switch(randomChoice())
  {
  case 0:
    return lshape.get();
  case 1:
    return sshape.get();
  case 2:
    return oshape.get();
  case 3:
    return zshape.get();
  case 4:
    return tshape.get();
  case 5:
    return jshape.get();
  case 6:
    return ishape.get();
  }
}
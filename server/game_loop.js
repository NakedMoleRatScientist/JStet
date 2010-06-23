var sys = require('sys')

exports.initializeLoop = function()
{
  var state = true;
  while (state == true)
  {
    sys.log("RUNNING!");
  }
}
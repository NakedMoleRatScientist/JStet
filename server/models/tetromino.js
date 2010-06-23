

  //find max length of a shape
exports.find_max_x = function()
{
  max = 0;
  for (x = 0; x < 4; x++)
  {
    for (y = 0; y <4; y++)
    {
      if (blocks[x][y] == 1)
      {
	if(x > max)
	{
	  max = x;
	}
      }
    }
  }
  return max;
}
  //find max height of a shape
  exports.find_max_y = function()
  {
    max = 0;
    for (x = 0; x < 4; x++)
    {
      for(y = 0; y < 4; y++)
      {
	if (y > max)
	{
	  max = y;
	}
      }
    }
    return max;
  };
  //create a shape
  exports.create_blocks = function()
  {
    var blocks = new Array(4)
    for (i = 0; i< 4; i++)
    {
      blocks[i] = new Array(4)
    }
    return blocks;
  };
  //modify whole shapes
  exports.modify_bluk = function(shape)
  {
    for (i = 0; i < shape.length; i++)
    {
      exports.modify_block(shape[i][0],shape[i][1],1);
    }
  };
  //get a list of all suitable blocks
  exports.get_list = function()
  {
    new suitable = new Array();
    for (r = 0; r < 4; r++)
    {
      for (c = 0; c < 4; c++)
      {
	if (exports.blocks[r][c] == 1)
	{
	  suitable.push([r,c]);
	}
      }
    }
    return suitable;
  };
  //return every block to zero
  exports.return_to_zero = function()
  {
    exports.choice = 0;
    exports.modify_bulk(exports.shape.get_data(exports.choice));
  };
  //rotate forward
  exports.rotate = function()
  {
    exports.blocks = exports.create_block();
    exports.choice += 1;
    if (exports.choice == exports.shape.length)
    {
      exports.choice = 0;
    }
    exports.modify_bulk(exports.shape.get_data(exports.choice));
    if (exports.rotation_collision_x() == true || exports.rotation_collision_y() == true)
    {
      exports.rotate_backward();
    }
  };
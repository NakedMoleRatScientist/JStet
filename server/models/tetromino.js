var shape = null;
var blocks = null;

function positions()
{
  var self = this;
}
var x = 0;
var y = 0;
  //find max length of a shape
function find_max_y()
{
  var max = 0;
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
function find_max_y()
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
  var suitable = new Array();
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
  exports.modify_bulk(shape.get_data(exports.choice));
};

//rotate forward
exports.rotate = function()
{
  blocks = create_block();
  choice += 1;
  if (choice == shape.length)
  {
    choice = 0;
  }
  exports.modify_bulk(shape.get_data(choice));
  if (rotation_collision_x() == true || rotation_collision_y() == true)
  {
    rotate_backward();
  }
};

//detect if it is too far to the right
function rotation_collision_x()
{
  if (x > 180 - (find_max_x() * 20))
  {
    return true;
  }
  return false;
}

//detect if it is too low.
function rotation_collision_y()
{
  if (y > 380 - find_max_y() * 20)
  {
    return true;
  }
  return false;
}


//rotate backward
exports.rotate_backward = function()
{
  blocks = exports.create_blocks();
  choice -= 1;
  if (choice == -1)
  {
    choice = shape.length - 1;
  }
  exports.modify_bulk(shape.get_data(choice));
}


//move shape
exports.move = function(x_move,y_move)
{
  x += x_move;
  y += y_move;
  if (x < 0 || rotation_collision_x() == true)
  {
    x -= x_move;
    return 1;
  }
  if (rotation_collision_y() == true)
  {
    y -= y;
    return 2;
  }
  return 0;
}

blocks = exports.create_blocks();



function Tetromino()
{
  self = this;
  self.blocks = null;
  self.choice = null;
  self.x = 0;
  self.y = 0;
  //find max length of a shape
  function find_max_y()
  {
    var max = 0;
    for (x = 0; x < 4; x++)
    {
      for (y = 0; y <4; y++)
      {
        if (self.blocks[x][y] == 1)
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
	if (self.blocks[x][y] == 1)
	{
          if (y > max)
          {
	    max = y;
          }
	}
      }
    }
    return max;
  };
  
//modify a block

exports.modify_block = function(x,y,i)
{
  blocks[x][y] = i;
}
}

  






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
exports.modify_bulk = function(shape)
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
  choice = 0;
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
  if (pos.x > 180 - (find_max_x() * 20))
  {
    return true;
  }
  return false;
}

//detect if it is too low.
function rotation_collision_y()
{
  if (pos.y > 380 - find_max_y() * 20)
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
  pos.x += x_move;
  pos.y += y_move;
  if (x < 0 || rotation_collision_x() == true)
  {
    pos.x -= x_move;
    return 1;
  }
  if (rotation_collision_y() == true)
  {
    pos.y -= y;
    return 2;
  }
  return 0;
}

//change the shape
exports.change_shape = function(new_shape)
{
  shape = new_shape;
  blocks = exports.create_blocks();
  choice = 0;
  exports.modify_bulk(shape.get_data(choice));
}

//get shape
exports.get_shape = function()
{
  return shape;
}


exports.get_choice = function()
{
  return choice;
}

blocks = exports.create_blocks();



function Tetromino()
{
  self = this;
  self.blocks = null;
  self.choice = null;
  self.x = 0;
  self.y = 0;
  //find max length of a shape
  self.find_max_x = function()
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
  };
  //find max height of a shape
  self.find_max_y = function()
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
  self.modify_block = function(x,y,i)
  {
    self.blocks[x][y] = i;
  }
  //create a shape
  self.create_blocks = function()
  {
    var blocks = new Array(4)
    for (i = 0; i< 4; i++)
    {
      blocks[i] = new Array(4)
    }
    return blocks;
  };
  //modify whole shapes
  self.modify_bulk = function(shape)
  {
    for (i = 0; i < shape.length; i++)
    {
      self.modify_block(shape[i][0],shape[i][1],1);
    }
  };
  //get a list of all suitable blocks
  self.get_list = function()
  {
    var suitable = new Array();
    for (r = 0; r < 4; r++)
    {
      for (c = 0; c < 4; c++)
      {
        if (self.blocks[r][c] == 1)
        {
	  suitable.push([r,c]);
        }
      }
    }
    return suitable;
  };
  //return every block to zero
  self.return_to_zero = function()
  {
    self.choice = 0;
    self.modify_bulk(self.shape.get_data(self.choice));
  };
  //rotate forward
  self.rotate = function()
  {
    self.blocks = create_block();
    self.choice += 1;
    if (self.choice == self.shape.length)
    {
      self.choice = 0;
    }
    self.modify_bulk(shape.get_data(choice));
    if (self.rotation_collision_x() == true || self.rotation_collision_y() == true)
    {
      self.rotate_backward();
    }
  };
  //detect if it is too far to the right
  self.rotation_collision_x = function()
  {
    if (self.x > 180 - (find_max_x() * 20))
    {
      return true;
    }
    return false;
  };
  //detect if it is too low.
  self.rotation_collision_y = function()
  {
    if (self.y > 380 - find_max_y() * 20)
    {
      return true;
    }
    return false;
  };
  //rotate backward
  self.rotate_backward = function()
  {
    self.blocks = self.create_blocks();
    self.choice -= 1;
    if (self.choice == -1)
    {
      self.choice = self.shape.length - 1;
    }
    self.modify_bulk(self.shape.get_data(choice));
  };
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
  //change the shape
  self.change_shape = function(new_shape)
  {
    self.shape = new_shape;
    self.blocks = self.create_blocks();
    self.choice = 0;
    self.modify_bulk(self.shape.get_data(choice));
  };
  //get shape
  self.get_shape = function()
  {
    return shape;
  };
  //get choice
  self.get_choice = function()
  {
    return choice;
  };
  self.blocks = self.create_blocks();
}


exports.get_tetromino = function()
{
  return new Tetromino();
}

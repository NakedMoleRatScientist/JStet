
function Tetromino ()
{
  var self = this;
  self.shape = null;
  self.choice = 0;
  self.draw = false;
  self.x = 0;
  self.y = 0;
  self.create_blocks = function()
  {
    var blocks = new Array(4);
    for (i = 0; i < 4; i++)
    {
      blocks[i] = new Array(4);
    }
    return blocks;
  },
  self.blocks = self.create_blocks();
  self.change_shape = function(new_shape)
  {
    self.shape = new_shape;
    self.blocks = self.create_blocks();
    self.choice = 0;
    self.update_shape();
  };
  self.rotate = function(choice)
  {
    self.blocks = self.create_blocks();
    self.choice = choice;
    self.update_shape();
  };
  self.return_to_zero = function()
  {
    self.x = 0;
    self.y = 0;
  };
  self.modify_bulk = function(shape)
  {
    for (var i = 0; i < shape.length; i++)
    {
      self.modify_block(shape[i][0],shape[i][1],1);
    }
  },
  self.modify_block = function(x, y, i)
  {
   
    self.blocks[x][y] = i;
  },
  //get list of actual, suitable blocks
  self.get_list = function()
  {
    var suitable = new Array();
    for (var r = 0; r < 4; r++)
    {
      for (var c = 0; c < 4; c++)
      {
        if (self.blocks[r][c] == 1)
	{
          suitable.push([r,c]);
        }
      }
    }
    return suitable;
  }
  self.update_shape = function()
  {
    self.modify_bulk(self.shape.get_data(self.choice));
  };
  self.find_max_x = function()
  {
    var max = 0;
    for (var x = 0; x < 4; x++)
    {
      for (var y = 0; y <4; y++)
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
  self.find_max_y = function()
  {
    var max = 0;
    for (var x = 0; x < 4; x++)
    {
      for(var y = 0; y < 4; y++)
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
  self.move = function(x_move,y_move)
  {
    self.x += x_move;
    self.y += y_move;
    if (self.x < 0 || self.rotation_collision_x() == true)
    {
      self.x -= x_move;
      return 1;
    }
    if (self.rotation_collision_y() == true)
    {
      self.y -= y_move;
      return 2;
    }
    return 0;
  };
  self.rotation_collision_y = function()
  {
    if (self.y > 380 - self.find_max_y() * 20)
    {
      return true;
    }
    return false;
  };
  self.rotation_collision_x = function()
  {
    if (self.x > 180 - (self.find_max_x() * 20))
    {
      return true;
    }
    return false;
  };
}

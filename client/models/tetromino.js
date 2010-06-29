
function Tetromino ()
{
  var self = this;
  self.shape = null;
  self.choice = 0;
  self.change_shape = function(new_shape)
  {
    self.shape = new_shape;
    self.blocks = self.create_blocks();
    self.choice = 0;
    self.modify_bulk(self.shape.get_data(self.choice));
  },
  self.create_blocks = function()
  {
    var blocks = new Array(4);
    for (i = 0; i < 4; i++)
    {
      blocks[i] = new Array(4);
    }
    return blocks;
  },
  self.modify_bulk = function(shape)
  {
    for (int i = 0; i < shape.length; i++)
    {
      self.modify_block(shape[i][0],shape[i][1],1);
    }
  },
  self.modify_block = function(x, y, i)
  {
   
    self.blocks[x][y] = i;
  },
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
  },
  self.return_to_zero = function ()
  {
    self.choice = 0;
    self.modify_bulk(self.shape.get_data(self.choice));
  }
  self.rotate = function()
  {
    self.blocks = self.create_blocks();
    self.choice += 1;
    if (self.choice == self.shape.length)
    {
      self.choice = 0;
    }
    self.modify_bulk(self.shape.get_data(self.choice));
    if (self.rotation_collision_x() == true || self.rotation_collision_y() == true)       {
      self.rotate_backward();
    }
  },
  self.rotate_backward = function()
  {
    self.blocks = self.create_blocks()
    self.choice -= 1;
    if (self.choice == -1)
    {
      self.choice = self.shape.length - 1;
    }
    self.modify_bulk(self.shape.get_data(self.choice));
  },
  self.rotation_collision_x = function()
  {
    if (self.x > 180 - (self.find_max_x() * 20))
    {
      return true;
    }
    return false;
  },
  self.rotation_collision_y = function()
  {
    if (self.y > 380 - (self.find_max_y() * 20))
    {
      return true;
    }
    return false;
  },
  self.move = function (x,y)
  {
    self.x += x;
    self.y += y;
    if (self.x < 0 || self.rotation_collision_x() == true)
    {
      self.x -= x;
      return 1;
    }
    if (self.rotation_collision_y() == true)
    {
      self.y -= y;
      return 2;
    }
    return 0;
  },
  self.return_to_normal = function()
  {
    self.x = 0;
    self.y = 0;
  }
  self.blocks = self.create_blocks();
  self.x = 0;
  self.y = 0;
}

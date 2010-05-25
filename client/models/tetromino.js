
function Tetromino ()
{
  this.shape = null;
  this.choice = 0;
  this.find_max_x = function()
  {
    max = 0;
    for (x = 0; x < 4; x++)
    {
      for (y = 0; y < 4; y++)
      {
        if (this.blocks[x][y] == 1)
        {
          if (x > max)
          {
            max = x;
          }
        }
      }
    }
    return max;
  },
  this.find_max_y = function()
  {
    max = 0;
    for (x = 0; x < 4; x++)
    {
      for (y = 0; y < 4; y++)
      {
        if (this.blocks[x][y] == 1)
        {
          if (y > max)
          {
            max = y;
          }
        }
      }
    }
    return max;
  }
  this.change_shape = function(new_shape)
  {
    this.shape = new_shape;
    this.blocks = this.create_blocks();
    this.choice = 0;
    this.modify_bulk(this.shape.get_data(this.choice));
  },
  this.create_blocks = function()
  {
    var blocks = new Array(4);
    for (i = 0; i < 4; i++)
    {
      blocks[i] = new Array(4);
    }
    return blocks;
  },
  this.modify_bulk = function(shape)
  {
    for (int i = 0; i < shape.length; i++)
    {
      this.modify_block(shape[i][0],shape[i][1],1);
    }
  },
  this.modify_block = function(x, y, i)
  {
   
    this.blocks[x][y] = i;
  },
  this.get_list = function()
  {
    var suitable = new Array();
    for (r = 0; r < 4; r++)
    {
      for (c = 0; c < 4; c++)
      {
        if (this.blocks[r][c] == 1)
	{
          suitable.push([r,c]);
        }
      }
    }
    return suitable;
  },
  this.return_to_zero = function ()
  {
    this.choice = 0;
    this.modify_bulk(this.shape.get_data(this.choice));
  }
  this.rotate = function()
  {
    this.blocks = this.create_blocks();
    this.choice += 1;
    if (this.choice == this.shape.length)
    {
      this.choice = 0;
    }
    this.modify_bulk(this.shape.get_data(this.choice));
    if (this.rotation_collision_x() == true || this.rotation_collision_y() == true)       {
      this.rotate_backward();
    }
  },
  this.rotate_backward = function()
  {
    this.blocks = this.create_blocks()
    this.choice -= 1;
    if (this.choice == -1)
    {
      this.choice = this.shape.length - 1;
    }
    this.modify_bulk(this.shape.get_data(this.choice));
  },
  this.rotation_collision_x = function()
  {
    if (this.x > 180 - (this.find_max_x() * 20))
    {
      return true;
    }
    return false;
  },
  this.rotation_collision_y = function()
  {
    if (this.y > 380 - (this.find_max_y() * 20))
    {
      return true;
    }
    return false;
  },
  this.move = function (x,y)
  {
    this.x += x;
    this.y += y;
    if (this.x < 0 || this.rotation_collision_x() == true)
    {
      this.x -= x;
      return 1;
    }
    if (this.rotation_collision_y() == true)
    {
      this.y -= y;
      return 2;
    }
    return 0;
  },
  this.return_to_normal = function()
  {
    this.x = 0;
    this.y = 0;
  }
  this.blocks = this.create_blocks();
  this.x = 0;
  this.y = 0;
}

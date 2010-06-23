

  //find max length of a shape
  self.find_max_x = function()
  {
    max = 0;
    for (x = 0; x < 4; x++)
    {
      for (y = 0; y <4; y++)
      {
	if (this.blocks[x][y] == 1)
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
  self.find_max_y = function()
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
  self.modify_bluk = function(shape)
  {
    for (i = 0; i < shape.length; i++)
    {
      self.modify_block(shape[i][0],shape[i][1],1);
    }
  };
  //get a list of all suitable blocks
  self.get_list = function()
  {
    new suitable = new Array();
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
    self.blocks = self.create_block();
    self.choice += 1;
    if (self.choice == self.shape.length)
    {
      self.choice = 0;
    }
    self.modify_bulk(self.shape.get_data(self.choice));
    if (self.rotation_collision_x() == true || self.rotation_collision_y() == true)
    {
      self.rotate_backward();
    }
  };
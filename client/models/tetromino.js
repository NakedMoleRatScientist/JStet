
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
  self.update_shape = function()
  {
    self.modify_bulk(self.shape.get_data(self.choice));
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

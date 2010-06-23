
function Tetromino()
{
  var self = this;
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
  }
}
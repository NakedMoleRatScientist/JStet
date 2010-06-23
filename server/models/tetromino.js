
function Tetromino()
{
  var self = this;
  //find max length of a block
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
}
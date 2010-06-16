
function PlayField()
{
  self = this;
  self.create_field = function()
  {
    var field = new Array(10);
    for (x = 0; x < 10; x++)
    {
      field[x] = new Array(20);
      for (y = 0; y < 20; y++)
      {
        field[x][y] = 0;
      }
    }
    return field;
  };
  //Get a list of qualified blocks to the field.
  self.get_list = function(blocks)
  {
    var coord = new Array();
    for (var x = 0; x < 4; x++)
    {
      for(var y = 0; y < 4; y++)
      {
        if (blocks[x][y] == 1)
        {
          coord.push([x,y]);
        }
      }
    }
    return coord;
  };
  self.check = function(blocks,x_offset,y_offset)
  {
    for (i = 0; i < 4; i++)
    {
      if (self.field[blocks[i][0] + x_offset][blocks[i][1] + y_offset] != 0)
      {
        return false;
      }
    }
    return true;
  };
  self.insert_blocks = function(blocks,c,r,color)
  {
    var offset = self.calculate_positions(c,r);
    var list = self.get_list(blocks);
    for (var i = 0; i < 4; i++)
    {
      self.field[list[i][0] + offset[0]][list[i][1] + offset[1]] = color;
    }
  };
  self.field = self.create_field();
}

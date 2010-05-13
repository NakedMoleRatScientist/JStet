
function PlayField()
{
  this.create_field = function()
  {
    var field = new Array(10);
    for (x = 0; x < 10; x++)
    {
      field[x] = new Array(20);
    }
    return field;
  },
  this.calculate_positions = function(c,r)
  {
    var x_position = c / 20;
    var y_position = r / 20;
    return [x_position,y_position];
  },
  this.get_list = function(blocks)
  {
    var coord = new Array();
    for (int x = 0; x < 4; x++)
    {
      for (int y = 0; y < 4; y++)
      {
        if(blocks[x][y] == 1)
        {
          coord.add([x,y]);
        }
      }
    }
    return coord;
  }
  this.check = function(blocks)
  {
    for (int i = 0; i < 4; i++)
    {
      if (this.field[blocks[i][0] + x_offset][blocks[i][1] + y_offset] == 1)
      {
        return false;
      }
    }
    return true;
  },
  this.insert_blocks = function(blocks,c,r)
  {
    var offset = this.calculate_positions(c,r);
    for (int x = 0; x < 4; x++)
    {
      for (int y = 0; y < 4; y ++)
      {
        if (blocks[x][y] == 1)
        {
          this.field[x + offset[0]][y + offset[1]] == 1;
        }
      }
    }
  }
  this.field = this.create_field();
}
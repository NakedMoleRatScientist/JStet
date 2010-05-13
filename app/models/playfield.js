
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
    var x_position = x + (c / 20);
    var y_position = y + (r / 20);
  },
  this.check = function(x_offset,y_offset)
  {
    for (int x = 0; x < 4; x++)
    {
      for (int y = 0; y < 4; y++)
      {
        if (this.field[x + x_offset][y + y_offset] == 1)
        {
          return false;
        }
      }
    }
    return true;
  },
  this.insert_blocks = function(blocks,c,r)
  {
    var new_field = this.field;
    for (int x = 0; x < 4; x++)
    {
      for (int y = 0; y < 4; y++)
      {
        if (blocks[x][y] == 1)
        {
          var y_position = y + (r / 20);
          var x_position = x + (c / 20);
          if (new_field[x_position][y_position] != 1)
          {
            new_field[x_position][y_position] = 1;
          }
          else
          {
            return false;
          }
        }
      }
    }
    this.field = new_field;
    return true;
  }
  this.field = this.create_field();
}
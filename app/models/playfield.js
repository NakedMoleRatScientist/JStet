
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
    return [x_position,y_position];
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
    var offset = this.calculate_positions();    
  }
  this.field = this.create_field();
}
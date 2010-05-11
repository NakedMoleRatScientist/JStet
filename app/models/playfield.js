
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
  this.insert_blocks = function(blocks,c,r)
  {
    for (int x = 0; x < 4; x++)
    {
      for (int y = 0; y < 4; y++)
      {
        if (blocks[x][y] == 1)
        {
          var y_position = r / 20;
          var x_position = c / 20;
          
          if(this.field[x + x_position][y + y_position] == 0)
          {
            this.field[x + x_position][y+ + y_position] = 1)
          };
        }
      }
    }
  }
  this.field = this.create_field();
}
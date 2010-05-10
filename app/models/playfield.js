
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
          this.field[x][y] = 1;
        }
      }
    }
  }
  this.field = this.create_field();
}
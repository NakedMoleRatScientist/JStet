
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
  //Add qualified blocks to the field.
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
  };
  self.field = self.create_field();
}


function PlayField()
{
  self = this;
  self.create_field = function()
  {
    var field = new Array(10);
    for (x = 0; x < 10; x++)
    {
      field[x] = new Array(20);
      for (z = 0; z < 20; z++)
      {
        field[x][z] = 0;
      }
    }
    return field;
  };
}

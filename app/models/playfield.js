
function Playfield()
{
  this.create_field = function()
  {
    var field = new Array(20);
    for (i = 0; i < 20; i++)
    {
      field[i] = new Array(10);
    }
    return field;
  }
}

function PlayField()
{
  this.create_field = function()
  {
    var field = new Array(10);
    for (i = 0; i < 10; i++)
    {
      field[i] = new Array(20);
    }
    return field;
  }
  this.field = this.create_field();
}
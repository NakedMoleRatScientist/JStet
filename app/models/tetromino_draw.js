
function TetrominoDraw()
{
  this.blocks = new Array();
  this.create_blocks = function(pos,x,y)
  {
    for (i = 0; i < pos.length; i++)
    {
      this.blocks.push(rect(pos[i][0] * 20 + x + 50,pos[i][1] * 20 + y + 50, 20, 20));
    }
  }
  this.draw_field = function(field)
  {
    for (x = 0; x < 10; x++)
    {
      for (y = 0; y < 20; y++)
      {
        if (field[x][y] == 1)
        {
          rect((x * 20) + 50,(y * 20) + 50,20,20);
        }
      }
    }
  }
}
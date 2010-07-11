
function TetrominoDraw()
{
  this.create_blocks = function(pos,x,y,color)
  {
    for (var i = 0; i < pos.length; i++)
    {
      stroke(color);
      fill(color);
      rect(pos[i][0] * 20 + x + 50,pos[i][1] * 20 + y + 50, 20, 20);
      stroke(255);
      fill(255);
    }
  }
  this.draw_field = function(field)
  {
    for (var x = 0; x < 10; x++)
    {
      for (var y = 0; y < 20; y++)
      {
        if (field[x][y] != 0)
        {
          stroke(field[x][y]);
          fill(field[x][y]);
          rect((x * 20) + 50,(y * 20) + 50,20,20);
          stroke(255);
          fill(255);
        }
      }
    }
  }
}

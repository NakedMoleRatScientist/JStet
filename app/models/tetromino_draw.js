function TetrominoDraw()
{
  this.blocks = new Array();
  this.create_blocks = function(pos)
  {
    console.log(pos);
    for (i = 0; i < pos.length; i++)
    {
      this.blocks.push(rect(pos[i][0] * 20,pos[i][1] * 20, 20, 20));
    }
  }
}
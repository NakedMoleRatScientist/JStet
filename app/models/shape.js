
function Tetromino ()
{
  this.create_blocks = function()
  {
    var blocks = new Array(4);
    for (int i = 0; i < 4; i++)
    {
      blocks[i] = new Array(4);
  }
  this.modify_block = function(x, y, i)
  {
   
    this.blocks[x][y] = i;
  }
}

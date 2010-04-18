
function Tetromino ()
{
  this.blocks = [4][4];
  this.modify_block = function(x,y,i)
  {
    this.blocks[x][y] = i;
  }
}


function Tetromino ()
{
  this.create_blocks = function()
  {
    var blocks = new Array(4);
    for (i = 0; i < 4; i++)
    {
      blocks[i] = new Array(4);
    }
    return blocks;
  },
  this.modify_block = function(x, y, i)
  {
   
    this.blocks[x][y] = i;
  },
  this.get_list = function()
  {
    var suitable = new Array();
    for (r = 0; r < 4; r++)
    {
      for (c = 0; c < 4; c++)
      {
        if (this.blocks[r][c] == 1)
	{
          suitable.push([r,c]);
        }
      }
    }
    return suitable;
  }
  this.blocks = this.create_blocks();
}
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
void setup()
{
  size(800,600);
  stroke(255);
  frameRate(24);
}

var lshape = new Tetromino();
lshape.modify_block(0,0,1);
lshape.modify_block(1,0,1);
lshape.modify_block(2,0,1);
lshape.modify_block(2,1,1);
var drawShape = new TetrominoDraw();

void draw()
{
  drawShape.create_blocks(lshape.get_list());
}
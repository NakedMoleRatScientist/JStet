
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
  },
  this.rotate = function()
  {
      var new_matrix = this.create_blocks();
      for (int r = 0; r < 4; r++)
      {
          for (int c = 0; c < 4; c++)
          {
	      new_matrix[r][c] = this.blocks[4 - c - 1][r];
          }
      }
      this.blocks = new_matrix;
  },
  this.move = function (x,y)
  {
    this.x += x;
    this.y += y;
  }  
  this.blocks = this.create_blocks();
  this.x = 0;
  this.y = 0;
}

function ShapeGenerator ()
{
  this.randomChoice = function ()
  {
    return Math.random() * 6;
  }
  this.getShape = function()
  {
    var list = new Array();
    var choice = this.randomChoice();
    switch(choice)
    {
    case 1:
      {
        list.add([0,0]);
        list.add([0,1]);
        list.add([0,2]);
        list.add([1,2]);
        break;
      }
    case 2:
      {
        list.add([0,0]);
        list.add([0,1]);
        list.add([0,2]);
        list.add([0,3]);
        break;
      }
    case 3:
      {
        list.add([0,0]);
        list.add([1,0]);
        list.add([2,0]);
        list.add([1,1]);
      }
    case 4:
      {
        list.add([0,0]);
        list.add([1,0]);
        list.add([0,1]);
        list.add([1,1]);
        break;
      }
    case 5:
      {
        list.add([1,0]);
        list.add([2,0]);
        list.add([1,1]);
        list.add([0,1]);
        break;
      }
    case 6:
      {
        list.add([0,0]);
        list.add([1,0]);
        list.add([1,1]);
        list.add([2,1]);
        break;
      }
    case 7:
      {
        list.add([1,0]);
        list.add([1,1]);
        list.add([1,2]);
        list.add([0,3]);
        break;
      }
    }
    return list;
  }
}function TetrominoDraw()
{
  this.blocks = new Array();
  this.create_blocks = function(pos,x,y)
  {
    for (i = 0; i < pos.length; i++)
    {
      this.blocks.push(rect(pos[i][0] * 20 + x,pos[i][1] * 20 + y, 20, 20));
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
lshape.modify_block(0,1,1);
lshape.modify_block(0,2,1);
lshape.modify_block(1,2,1);
var drawShape = new TetrominoDraw();

void draw()
{
  background(0,0,0);
  drawShape.create_blocks(lshape.get_list(),lshape.x,lshape.y);
}

void keyPressed()
{
    switch(key)
    {
    case 100:
        lshape.move(20,0);
        break;
    case 115:
        lshape.move(0,20);
        break;
    case 97:
        lshape.move(-20,0);
        break;
    case 119:
        lshape.rotate();
        break;
    default:
	console.log(key);
	break;
    }
}
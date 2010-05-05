
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
  this.modify_bulk = function(blocks)
  {
    for (int i = 0; i < blocks.length; i++)
    {
      this.modify_block(blocks[i][0],blocks[i][1]);
    }
  }
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
        list.push([0,0]);
        list.push([0,1]);
        list.push([0,2]);
        list.push([1,2]);
        break;
      }
    case 2:
      {
        list.push([0,0]);
        list.push([0,1]);
        list.push([0,2]);
        list.push([0,3]);
        break;
      }
    case 3:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([2,0]);
        list.push([1,1]);
      }
    case 4:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([0,1]);
        list.push([1,1]);
        break;
      }
    case 5:
      {
        list.push([1,0]);
        list.push([2,0]);
        list.push([1,1]);
        list.push([0,1]);
        break;
      }
    case 6:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([1,1]);
        list.push([2,1]);
        break;
      }
    case 7:
      {
        list.push([1,0]);
        list.push([1,1]);
        list.push([1,2]);
        list.push([0,3]);
        break;
      }
    }
    return list;
  }
  this.current = this.getShape();
}
function TetrominoDraw()
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

var generator = new ShapeGenerator();
var shape = new Tetromino();
shape.modify_bulk(generator.current);
var drawShape = new TetrominoDraw();

void draw()
{
  background(0,0,0);
  drawShape.create_blocks(shape.get_list(),shape.x,shape.y);
}

void keyPressed()
{
    switch(key)
    {
    case 100:
        shape.move(20,0);
        break;
    case 115:
        shape.move(0,20);
        break;
    case 97:
        shape.move(-20,0);
        break;
    case 119:
        shape.rotate();
        break;
    default:
	console.log(key);
	break;
    }
}

function TimerAction()
{
  this.speed = 1000;
  this.time = new Date();
  this.react = function()
  {
    var new_time = new Date();
    if (new_time - this.time >= 1000)
    {
      this.time = new_time;
      return true;
    }
    return false;
  }
}
function PlayField()
{
  this.create_field = function()
  {
    var field = new Array(10);
    for (x = 0; x < 10; x++)
    {
      field[x] = new Array(20);
    }
    return field;
  },
  this.calculate_positions = function(c,r)
  {
    var x_position = c / 20;
    var y_position = r / 20;
    return [x_position,y_position];
  },
  this.get_list = function(blocks)
  {
    var coord = new Array();
    for (int x = 0; x < 4; x++)
    {
      for (int y = 0; y < 4; y++)
      {
        if(blocks[x][y] == 1)
        {
          coord.push([x,y]);
        }
      }
    }
    return coord;
  }
  this.check = function(blocks,x_offset,y_offset)
  {
    for (int i = 0; i < 4; i++)
    {
      if (this.field[blocks[i][0] + x_offset][blocks[i][1] + y_offset] == 1)
      {
        return false;
      }
    }
    return true;
  },
  this.insert_blocks = function(blocks,c,r)
  {
    var offset = this.calculate_positions(c,r);
    var list = this.get_list(blocks);
    for (int i = 0; i < 4; i ++)
    {
      this.field[list[i][0] + offset[0]][list[i][1] + offset[1]] = 1;
    }
  }
  this.field = this.create_field();
}
function PlayFieldDraw()
{
  this.x = 50;
  this.y = 50;
  this.width = 200;
  this.height = 400;
}
function Tetromino ()
{
  this.shape = null;
  this.choice = 0;
  this.find_max_x = function()
  {
    max = 0;
    for (x = 0; x < 4; x++)
    {
      for (y = 0; y < 4; y++)
      {
        if (this.blocks[x][y] == 1)
        {
          if (x > max)
          {
            max = x;
          }
        }
      }
    }
    return max;
  },
  this.find_max_y = function()
  {
    max = 0;
    for (x = 0; x < 4; x++)
    {
      for (y = 0; y < 4; y++)
      {
        if (this.blocks[x][y] == 1)
        {
          if (y > max)
          {
            max = y;
          }
        }
      }
    }
    return max;
  }
  this.change_shape = function(new_shape)
  {
    this.shape = new_shape;
    this.blocks = this.create_blocks();
    this.choice = 0;
    this.modify_bulk(this.shape.get_data(this.choice));
  },
  this.create_blocks = function()
  {
    var blocks = new Array(4);
    for (i = 0; i < 4; i++)
    {
      blocks[i] = new Array(4);
    }
    return blocks;
  },
  this.modify_bulk = function(shape)
  {
    for (int i = 0; i < shape.length; i++)
    {
      this.modify_block(shape[i][0],shape[i][1],1);
    }
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
    this.blocks = this.create_blocks();
    this.choice += 1;
    if (this.choice == this.shape.length)
    {
      this.choice = 0;
    }
    this.modify_bulk(this.shape.get_data(this.choice));
  }
  this.move = function (x,y)
  {
    this.x += x;
    this.y += y;
    if (this.x < 0 || this.x > 180 - (this.find_max_x() * 20))
    {
      this.x -= x;
      return 1;
    }
    if (this.y >  380 - (this.find_max_y() * 20))
    {
      this.y -= y;
      return 2;
    }
    return 0;
  },
  this.return_to_normal = function()
  {
    this.x = 0;
    this.y = 0;
  }
  this.blocks = this.create_blocks();
  this.x = 0;
  this.y = 0;
}

function JShape()
{
  this.length = 4;
  this.get_data = function(choice)
  {
    var list = new Array();
    switch(choice)
    {
    case 0:
      {
        list.push([1,0]);
        list.push([1,1]);
        list.push([1,2]);
        list.push([0,2]);
        break;
      }
    case 1:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([2,0]);
        list.push([2,1]);
        break;
      }
    case 2:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([0,1]);
        list.push([0,2]);
        break;
      }
    case 3:
      {
        list.push([0,0]);
        list.push([0,1]);
        list.push([1,1]);
        list.push([2,1]);
        break;
      }
    }
    return list;
  }
}
function IShape()
{
  this.length = 2;
  this.get_data = function(choice)
  {
    var list = new Array();
    switch(choice)
    {
    case 0:
      {
        list.push([0,0]);
        list.push([0,1]);
        list.push([0,2]);
        list.push([0,3]);
        break;
      }
    case 1:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([2,0]);
        list.push([3,0]);
        break;
      }
    }
    return list;
  }
}
function LShape()
{
  this.length = 4;
  this.get_data = function(choice)
  {
    var list = new Array();
    switch(choice)
    {
    case 0:
      {
        list.push([0,0]);
        list.push([0,1]);
        list.push([0,2]);
        list.push([1,2]);
        break;
      }
    case 1:
      {
        list.push([2,0]);
        list.push([0,1]);
        list.push([1,1]);
        list.push([2,1]);
        break;
      }
    case 2:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([1,1]);
        list.push([1,2]);
        break;
      }
    case 3:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([2,0]);
        list.push([0,1]);
        break;
      }
    }
    return list;
  }
}

function OShape()
{
  this.length = 1;
  this.get_data = function(choice)
  {
    var list = new Array();
    list.push([0,0]);
    list.push([1,0]);
    list.push([0,1]);
    list.push([1,1]);
    return list;
  }
}
function ZShape()
{
  this.length = 2;
  this.get_data = function(choice)
  {
    var list = new Array();
    switch(choice)
    {
    case 0:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([1,1]);
        list.push([2,1]);
        break;
      }
    case 1:
      {
        list.push([1,0]);
        list.push([1,1]);
        list.push([0,1]);
        list.push([0,2]);
        break;
      }
    }
    return list;
  }
}
function SShape()
{
  this.length = 2;
  this.get_data = function(choice)
  {
    var list = new Array();
    switch(choice)
    {
    case 0:
      {
        list.push([1,0]);
        list.push([2,0]);
        list.push([0,1]);
        list.push([1,1]);
        break;
      }
    case 1:
      {
        list.push([0,0]);
        list.push([0,1]);
        list.push([1,1]);
        list.push([1,2]);
        break;
      }
    }
    return list;
  }
}
function TShape()
{
  this.length = 4;
  this.get_data = function(choice)
  {
    var list = new Array();
    switch(choice)
    {
    case 0:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([2,0]);
        list.push([1,1]);
        break;
      }
    case 1:
      {
        list.push([0,0]);
        list.push([0,1]);
        list.push([0,2]);
        list.push([1,1]);
        break;
      }
    case 2:
      {
        list.push([1,0]);
        list.push([0,1]);
        list.push([1,1]);
        list.push([2,1]);
        break;
      }
    case 3:
      {
        list.push([1,0]);
        list.push([0,1]);
        list.push([1,1]);
        list.push([1,2]);
        break;
      }
    }
    return list;
  }
}
function ShapeGenerator ()
{
  this.randomChoice = function ()
  {
    return Math.floor(Math.random() * 7);
  }
  this.getShape = function()
  {
    var choice = this.randomChoice();
    switch(choice)
    {
    case 0:
      {
        return new LShape();
      }
    case 1:
      {
        return new SShape();
      }
    case 2:
      {
        return new OShape();
      }
    case 3:
      {
        return new ZShape();
      }
    case 4:
      {
        return new TShape();
      }
    case 5:
      {
        return new JShape();
      }
    case 6:
      {
        return new IShape();
      }
    }
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
void setup()
{
  size(800,600);
  stroke(255);
  frameRate(24);
}

var generator = new ShapeGenerator();
var shape = new Tetromino();
shape.change_shape(generator.current);
var field = new PlayField();
var drawShape = new TetrominoDraw();
var drawField = new PlayFieldDraw();
var timer = new TimerAction();

function cleanEvent()
{
  shape.return_to_normal();
  generator.current = generator.getShape();
  shape.change_shape(generator.current);
}
void draw()
{
  if (timer.react())
  {
    shape.move(0,20)
    var offset = field.calculate_positions(shape.x,shape,y);
    if (field.check(field.get_list(shape.blocks),offset[0],offset[1]) == false)
    {
      shape.move(0,-20);
      field.insert_blocks(shape.blocks,shape.x,shape.y);
      cleanEvent();
    }
  }
  
  background(0,0,0);
  stroke(205,201,201);
  fill(0,0,0);
  rect(drawField.x,drawField.y,drawField.width,drawField.height)
  stroke(255,255,255);
  fill(255,255,255);
  drawShape.create_blocks(shape.get_list(),shape.x,shape.y);
  drawShape.draw_field(field.field);
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
    case 101:
      generator.current = generator.getShape();
      shape.change_shape(generator.current);
      break;
    default:
      console.log(key);
      break;
    }
}


function ScoreNetwork(score)
{
  this.ws = null;
  this.data = null;
  this.score = score;
  this.initialize = function()
  {
    this.ws = new WebSocket('ws://localhost:7000');
    this.ws.onmessage = function(event)
    {
      this.data = JSON.parse(event.data);
      this.score.changeMinimum(this.getLimit());
    }
    this.ws.onclose = function()
    {
      console.log("Welcome to our world");
    }
  }
  //Return the mininum score to submit score to database.
  this.getLimit = function()
  {
    if (this.data.status == true)
    {
      return this.data.scores[99];
    }
    return false;
  }
  this.transmitScore = function()
  {
    var message = {
      name = "kiba",
      points = this.score.points,
    };
    this.ws.send(JSON.parse(message));
  }
}

//Use the ASCII chart to figure out what keys respond to what integer

void keyPressed()
{
  if (mode.status == 0)
  {
    switch(key)
    {
    //move right, d
    case 100:
      shape.move(20,0);
      checkEvent(-20,0);
      break;
    //move down, s
    case 115:
      shape.move(0,20);
      downEvent();
      break;
    //move left, a
    case 97:
      shape.move(-20,0);
      checkEvent(20,0);
      break;
    //rotate, w
    case 119:
      shape.rotate();
      if (checkEvent(0,0))
      {
        shape.rotate_backward();
      }
      break;
    default:
      console.log(key);
      break;
    }
  }
  else if (mode.status == 1)
  {
    if (key == 110)
    {
      field.field = field.create_field();
      mode.change(0);
      score.reset();
      timer.reset();
    }
  }
}
function TimerAction()
{
  this.speed = 1000;
  this.cycle = 0;
  this.time = new Date();
  this.tickCycle = function()
  {
    this.cycle++;
    if (this.cycle == 20)
    {
      this.speed--;
      this.cycle = 0;
    }
  },
  this.react = function()
  {
    var new_time = new Date();
    if (new_time - this.time >= this.speed)
    {
      this.time = new_time;
      this.tickCycle();
      return true;
    }
    return false;
  },
  this.reset = function()
  {
    this.cycle = 0;
    this.speed = 1000;
  }
}

//Deal with score keeping.
function Score()
{
  this.points = 0;
  this.minimum = 0;
  this.network = new ScoreNetwork(this);
  this.network.initialize();
  this.increase = function()
  {
    this.points ++;
  },
  this.changeMinimum = function(min)
  {
    if (min == false)
    {
      return false;
    }
    this.minimum = min;
  }
  this.toString = function()
  {
    return "Score: " + this.points;
  }
  this.reset = function()
  {
    this.points = 0;
  }
  this.check = function()
  {
    if (this.minimum == false || this.points != 0)
    {
      return true;
    }
    else if (this.minimum < this.points)
    {
      return true;
    }
    return false
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
      for (z = 0; z < 20; z++)
      {
        field[x][z] = 0;
      }
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
      if (this.field[blocks[i][0] + x_offset][blocks[i][1] + y_offset] != 0)
      {
        return false;
      }
    }
    return true;
  },
 this.insert_blocks = function(blocks,c,r,color)
  {
    var offset = this.calculate_positions(c,r);
    var list = this.get_list(blocks);
    for (int i = 0; i < 4; i ++)
    {
      this.field[list[i][0] + offset[0]][list[i][1] + offset[1]] = color;
    }
  },
  this.move_lines = function(line)
  {
    if (line == false)
    {
      return false;
    }
    for (int y = line; y > 1; y--)
    {
      for (int x = 0; x < 10; x++)
      {
        this.field[x][y] = this.field[x][y - 1];
      }
    }
    return true;
  },
  this.clear_line = function(line)
  {
    if (line == false)
    {
      return false;
    }
    for (int x = 0; x < 10; x++)
    {
      this.field[x][line] = 0;
    }
    return line;
  },
  this.check_field = function()
  {
    var line = 0;
    var score = 0;
    for (int y = 0; y < 20; y++)
    {
      score = 0;
      for (int x = 0; x < 10; x++)
      {
        if (this.field[x][y] != 0)
        {
          score ++;
        }
        else
        {
          x = 10;
        }
        if (score == 10)
        {
          return line;
        }
      }
      line ++;
    }
    return false;
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
  this.return_to_zero = function ()
  {
    this.choice = 0;
    this.modify_bulk(this.shape.get_data(this.choice));
  }
  this.rotate = function()
  {
    this.blocks = this.create_blocks();
    this.choice += 1;
    if (this.choice == this.shape.length)
    {
      this.choice = 0;
    }
    this.modify_bulk(this.shape.get_data(this.choice));
    if (this.rotation_collision_x() == true || this.rotation_collision_y() == true)       {
      this.rotate_backward();
    }
  },
  this.rotate_backward = function()
  {
    this.blocks = this.create_blocks()
    this.choice -= 1;
    if (this.choice == -1)
    {
      this.choice = this.shape.length - 1;
    }
    this.modify_bulk(this.shape.get_data(this.choice));
  },
  this.rotation_collision_x = function()
  {
    if (this.x > 180 - (this.find_max_x() * 20))
    {
      return true;
    }
    return false;
  },
  this.rotation_collision_y = function()
  {
    if (this.y > 380 - (this.find_max_y() * 20))
    {
      return true;
    }
    return false;
  },
  this.move = function (x,y)
  {
    this.x += x;
    this.y += y;
    if (this.x < 0 || this.rotation_collision_x() == true)
    {
      this.x -= x;
      return 1;
    }
    if (this.rotation_collision_y() == true)
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
  this.color = #14FF00;
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
  this.color = #FFFF00;
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
  this.color = #0011FF;
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
  this.color = 50;
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
  this.color = #FF0019;
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
  this.color = #00FFD9;
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
  this.color = #FF00F2;
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
  this.create_blocks = function(pos,x,y,color)
  {
    for (i = 0; i < pos.length; i++)
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
    for (x = 0; x < 10; x++)
    {
      for (y = 0; y < 20; y++)
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

function Mode()
{
  this.status = 0;
  this.change = function(n)
  {
    this.status = n;
  }
}
void setup()
{
  size(800,600);
  stroke(255);
  PFont font= loadFont("monospace");
  textFont(font,18);
  frameRate(24);
}
var mode = new Mode();
var score = new Score();
var generator = new ShapeGenerator();
var shape = new Tetromino();
shape.change_shape(generator.current);
var future = new Tetromino();
generator.getShape();
future.change_shape(generator.current);
var field = new PlayField();
var drawShape = new TetrominoDraw();
var drawField = new PlayFieldDraw();
var timer = new TimerAction();
function cleanEvent()
{
  shape.return_to_normal();
  shape.change_shape(generator.current);
  generator.current = generator.getShape();
  future.change_shape(generator.current);
}

function checkEvent(x,y)
{
  var offset = field.calculate_positions(shape.x,shape.y);
  if (field.check(field.get_list(shape.blocks),offset[0],offset[1]) == false)  
  {
    shape.move(x,y);
    return true;
  }
  return false;
}

function downEvent()
{
  if (checkEvent(0,-20))
  {
    if (shape.y == 0)
    {
      if (score.check())
      {
        mode.change(2);
      }
      mode.change(1);
    }
    insertEvent();
  }
}

function insertEvent()
{
  field.insert_blocks(shape.blocks,shape.x,shape.y,shape.shape.color);
  cleanEvent();
  while (field.move_lines(field.clear_line(field.check_field())))
  {
    score.increase();
  }
}

void drawInstruction()
{
  text("Instruction: ",450,50);
  text("a - left",450,80);
  text("s - down",450,100);
  text("d - right",450,120);
  text("w - rotate",450,140);
}

void draw()
{
  if (mode.status == 0)
  {
    if (timer.react())
    { 
      if (shape.move(0,20) == 2)
      {
        insertEvent();
      }
      downEvent();
    }
    
    background(0,0,0);
    stroke(205,201,201);
    fill(0,0,0);
    rect(drawField.x,drawField.y,drawField.width,drawField.height)
    stroke(255,255,255);
    fill(255,255,255);
    drawShape.create_blocks(shape.get_list(),shape.x,shape.y,shape.shape.color);
    text("Current: ",300,135);
    current = new Tetromino();
    current.change_shape(shape.shape);
    drawShape.create_blocks(current.get_list(),250,100,current.shape.color);
    text("Next: ", 300,250);
    drawShape.create_blocks(future.get_list(),250,210,future.shape.color);
    text(score.toString(),300,50);
    drawInstruction();
    drawShape.draw_field(field.field);
  }
  else if(mode.status == 1)
  {
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,35);
    text("GAME OVER",300,300);
    textFont(font,18);
    text("Press n to start a new game.",250,325);
  }
  else if(mode.status == 2)
  {
    score.transmitScore();
    background(0,0,0)
    PFont font = loadFont("monospace");
    textFont(font,35);
    text("HIGH SCORE LIST",300,0);
  }
}
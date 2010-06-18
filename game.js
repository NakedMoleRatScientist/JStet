
function TimerAction()
{
  var self = this;
  self.eclipsed = 0;
  self.speed = 1000;
  self.actions = [];
  self.cycle = 0;
  self.time = new Date();
  self.addAction = function(name , cycle)
  {
    self.actions.push([name,cycle]);
  };
  self.tickCycle = function()
  {
    self.cycle++;
    if (self.cycle == 100)
    {
      self.cycle = 0;
    }
  };
  //A name will be returned when it reached the specificed cycle.
  self.getEvent = function()
  {
    for (i = 0; i < self.actions.length;i++)
    {
      if (self.cycle == self.actions[i][1])
      {
        return self.actions[i][0];
      }
    };
    return false;
  };
  self.react = function()
  {
    var new_time = new Date();
    if (new_time - self.time >= self.speed)
    {
      self.time = new_time;
      self.tickCycle();
      self.eclipsed += 1; //As long as the speed is 1000, it'll be accurate
      return true;
    }
    return false;
  };
  self.reset = function()
  {
    self.cycle = 0;
  };
  self.getSeconds = function()
  {
    return self.eclipsed;
  };
}
void restartGame()
{
  field.field = field.create_field();
  mode.change(0);
  score.reset();
  timer.reset();
}

function ScoreBoard(score)
{
  self = this;
  self.score = score;
  self.start = 0;
  self.turn = false;
  self.title = function()
  {
    background(0,0,0)
    PFont font = loadFont("monospace");
    textFont(font,18);
    text("HIGH SCORE LIST",250,50);
  };
  self.page = function()
  {
    text("Page: " + (this.start / 20),200,550);
  };
  self.instruction = function()
  {
    text("Instructions:",500,50);
    text("n - new game",500,75);
    text("k - next page",500,100);
    text("j - previous page",500,125);
  };
  self.list = function()
  {
    data = score.network.getData();
    y = 70;
    limit = self.start + 20;
    self.turn = true;
    for (var i = self.start;i < limit;i++)
    {
      if (data.names[i] != "nothing")
      {
        text(data.names[i] + " : " + data.scores[i],250,y+= 20);
      }
      else
      {
        self.turn = false;
        return;
      }
    };
  };
  self.turnPage = function()
  {
    if (self.turn == true)
    {
      self.start += 20;
      if (self.start == 100)
      {
        self.start = 80;
      }
    }
  };
  self.previousPage = function()
  {
    if (self.start > 0)
    {
      self.start -= 20;
    }
  };
  self.display = function()
  {
    self.title();
    self.instruction();
    self.list();
    self.page();
  };
}



function ScoreProtocol(score)
{
  self = this;
  self.score = score;
}


function Net(score)
{
  self = this;
  self.ws = null;
  self.score = score;
  self.initialize = function()
  {
    self.ws = new WebSocket('ws://localhost:7000');
    self.ws.onmessage = function(event)
    {
      self.data = JSON.parse(event.data);
      switch (self.data[0])
      {
      case 0:
        sys.log("Excellent!");
      }
    };
    self.ws.onclose = function()
    {
      console.log("Connection ended.");
      console.log(timer.getSeconds() + " seconds has eclipsed");
    };
  };
  self.sendAlive = function()
  {
    var message = {
      type = 0,
      name = identifer,
      points = self.score.points
    };
    data = JSON.stringify(message);
    self.ws.send(data);
  };
}

function HighScore()
{
  var self = this;
  self.name = "";
  self.display = function()
  {
    background(0,0,0);
    noFill();
    rect(300,305,55,30);
    text("You have beaten a score in the worldwide top 100 ranking.",100,250);
    text("Please enter your 5 letters identifer.",200,275);
    text("Your identifer: ",250,300);
    text(self.name,300,325);
  };
  self.clean = function()
  {
    self.name = "";
  }
  self.addLetter = function(letter)
  {
    if (self.name.length != 5)
    {
      self.name += letter;
    }
  };
  self.destroy = function()
  {
    if (self.name.length != 0)
    {
      self.name = self.name.substring(0,self.name.length - 1);
    };
  };
  self.getName = function()
  {
    return self.name;
  }
}
void enterScoreKey()
{
  switch(key)
  {
  case 97:
    score_data.addLetter("a");
    break;
  case 98:
    score_data.addLetter("b");
    break;
  case 99:
    score_data.addLetter("c");
    break;
  case 100:
    score_data.addLetter("d");
    break;
  case 101:
    score_data.addLetter("e");
    break;
  case 102:
    score_data.addLetter("f");
    break;
  case 103:
    score_data.addLetter("g");
    break;
  case 104:
    score_data.addLetter("h");
    break;
  case 105:
    score_data.addLetter("i");
    break;
  case 106:
    score_data.addLetter("j");
    break;
  case 107:
    score_data.addLetter("k");
    break;
  case 108:
    score_data.addLetter("l");
    break;
  case 109:
    score_data.addLetter("m");
    break;
  case 110:
    score_data.addLetter("n");
    break;
  case 111:
    score_data.addLetter("o");
    break;
  case 112:
    score_data.addLetter("p");
    break;
  case 113:
    score_data.addLetter("q");
    break;
  case 114:
    score_data.addLetter("r");
    break;
  case 115:
    score_data.addLetter("s");
    break;
  case 116:
    score_data.addLetter("t");
    break;
  case 117:
    score_data.addLetter("u");
    break;
  case 118:
    score_data.addLetter("v");
    break;
  case 119:
    score_data.addLetter("w");
    break;
  case 120:
    score_data.addLetter("x");
    break;
  case 121:
    score_data.addLetter("y");
    break;
  case 122:
    score_data.addLetter("z");
    break;
  //backspace
  case 8:
    score_data.destroy();
    break;
  case 13:
    score.network.transmitScore(score_data.getName());
    score_data.clean();
    mode.change(2);
    break;
  }
}
void gameOverKey()
{
  if (key == 110)
  {
    restartGame();
  }
  else if(key == 100)
  {
    mode.change(2);
  }
}
void keyPressed()
{
  switch(mode.status)
  {
  case 0:
    gameKey();
    break;
  case 1:
    gameOverKey();
    break;
  case 2:
    scoreKey();
    break;
  case 3:
    enterScoreKey();
    break;
  }
}

void scoreKey()
{
  switch(key)
  {
  //n is restart the game
  case 110:
    restartGame();
    break;
  //j, view previous page
  case 106:
    board.previousPage();
    break;
  //k, view next page
  case 107:
    board.turnPage();
    break;
  }
}

//Use the ASCII chart to figure out what keys respond to what integer


void gameKey()
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

//Deal with score keeping.
function Score()
{
  self = this;
  self.points = 0;
  self.minimum = 0;
  self.network = new ScoreProtocol(self);
  self.increase = function()
  {
    self.points ++;
  },
  self.changeMinimum = function(min)
  {
    if (min == false)
    {
      return false;
    }
    self.minimum = min;
  }
  self.toString = function()
  {
    return "Score: " + self.points;
  }
  self.reset = function()
  {
    self.points = 0;
  }
  self.check = function()
  {
    if (self.minimum == false & self.points != 0)
    {
      return true;
    }
    else if (self.minimum < self.points && self.points != 0)
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
var board = new ScoreBoard(score);
var score_data = new HighScore();
var network = new Net(score);
console.log(network);
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
      if (score.check() == true)
      {
        mode.change(3);
      }
      else
      {
        mode.change(1);
      }
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

//Workaround for HTTP connections being droped after two minutes. Tried many settings to keep the connection alive to no avail. However, constant sending every minute does seem to keep the connection alive. This bug may not affect machines outside of the original's developer.


void sendAlive()
{
  if (timer.getEvent() == "network")
  {
    network.sendAlive();
  }
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
    sendAlive();
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
    timer.react();
    sendAlive();
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,35);
    text("GAME OVER",300,300);
    textFont(font,18);
    text("Press n to start a new game.",250,325);
    text("Press d to display highscore",250,350);
  }
  else if(mode.status == 2)
  {
    timer.react();
    sendAlive();
    board.display();
  }
  else if(mode.status == 3)
  {
    timer.react();
    sendAlive();
    score_data.display();
  }
}
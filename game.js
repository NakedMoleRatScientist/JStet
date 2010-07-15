
void restartGame()
{
  field.field = field.create_field();
  mode.change(4);
  score.reset();
  timer.reset();
}

//Data type is 2 for gameplay commands.
function GameProtocol(net)
{
  var self = this;
  self.net = net;
  self.net.game = self;
  self.engine = null;
  self.lastMessage = null;
  self.requestGame = function()
  {
    data = [2,0];
    self.net.send(data);
  };
  self.move_right = function()
  {
    data = [2,2,1];
    self.engine.move(20,0);
    self.net.send(data);
  };
  self.move_left = function()
  {
    data = [2,2,2];
    self.engine.move(-20,0);
    self.net.send(data);
  };
  self.move_down = function()
  {
    data = [2,2,3];
    self.engine.move(0,20);
    self.net.send(data);
  };
  self.rotate = function()
  {
    data = [2,2,4];
    self.net.send(data);
  };
  self.processData = function(data)
  {
    switch(data[0])
    {
    case 1:
      //Get new shape.
      if (self.checkIdentical(data))
      {
        console.log("New shape, ordered.");
	engine.write_shape(data[1],data[2],data[3]);
        self.net.send([2,1]);
      }
      break;
    case 2:
      console.log("Movement detected.");
      //Get movement update for current.
      if (self.checkIdentical(data))
      {
	engine.update_location(data[1],data[2]);
	self.net.send([2,1]);
      }
      break;
    case 3:
      //Rotation.
      if (self.checkIdentical(data))
      {
	console.log("Rotation detected.");
	engine.rotate(data[1]);
	self.net.send([2,1]);
      }
      break;
    case 4:
      //Kill some lines.
      if (self.checkIdentical(data))
      {
	self.engine.line_action(data[1]);
      }
      break;
    case 5:
      //Get score data.
      if (self.checkIdentical(data))
      {
	self.engine.score = data[1];
      }
      break;
    }
  };
  self.pushMessage = function(data)
  {
    self.lastMessage = new Array();
    for (var i = 0;i < data.length;i++)
    {
      self.lastMessage.push(data[i]);
    }
    console.log(self.lastMessage);
  };
  self.checkIdentical = function(data)
  {
    if (self.lastMessage == null || self.lastMessage != data.length - 1)
    {
      self.pushMessage(data);
      return true;
    }
    else
    {
      for (i = 0;i < self.lastMessage.length;i++)
      {
	if (self.lastMessage[i] != data[i + 1])
	{
	  self.pushMessage(data);
	  return true;
	}
      }
    }
    return false;
  };
}


function TitleScreen()
{
  var self = this;
  self.display = function()
  {
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,50);
    text("JStet",300,300);
    textFont(font,18);
    text("Press n for a new game.",260,325);
  };
}

function ScoreBoard(score)
{
  var self = this;
  self.score = score;
  self.start = 0;
  self.turn = false;
  self.title = function()
  {
    background(0,0,0);
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
    data = score.protocol.getData();
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



function ScoreProtocol(net)
{
  var self = this;
  self.data = null;
  self.net = net;
  self.changeData = function(data)
  {
    self.data = data;
  };
  self.getData = function()
  {
    return self.data;
  };
}


function Net()
{
  var self = this;
  self.ws = null;
  self.game = null;
  self.initialize = function()
  {
    self.ws = new WebSocket('ws://localhost:7000');
    self.ws.onmessage = function(event)
    {
      data = JSON.parse(event.data);
      
      switch (data[0])
      {
      case 0:
        //nothingness...
	break;
      case 2:
	self.game.processData(data[1]);
	break;
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
    var message = [1];
    self.ws.send(message);
  };
  self.send = function(data)
  {
    data = JSON.stringify(data);
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
void titleKey()
{
  switch(key)
  {
  case 110:
    mode.change(4);
    game_protocol.requestGame();
    break;
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
    network.transmitScore(score_data.getName());
    score_data.clean();
    mode.change(2);
    break;
  }
}

function GameOver()
{
  var self = this;
  self.display = function()
  {
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,35);
    text("Game OVER",300,300);
    textFont(font,18);
    text("Press n to start a new game.",250,325);
    text("Press d to display highscore", 250,350);
  };
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
    titleKey();
    break;
  case 4:
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
    game_protocol.move_right();
    break;
  //move down, s
  case 115:
    game_protocol.move_down();
    break;
  //move left, a
  case 97:
    game_protocol.move_left();
    break;
  //rotate, w
  case 119:
    game_protocol.rotate();
    break;
  default:
    console.log(key);
    break;
  }
}
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
function PlayField()
{
  this.create_field = function()
  {
    var field = new Array(10);
    for (var x = 0; x < 10; x++)
    {
      field[x] = new Array(20);
      for (var z = 0; z < 20; z++)
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
    for (var x = 0; x < 4; x++)
    {
      for (var y = 0; y < 4; y++)
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
    for (var i = 0; i < 4; i++)
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
    var list = blocks;
    for (var i = 0; i < 4; i ++)
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
    for (var y = line; y > 1; y--)
    {
      for (var x = 0; x < 10; x++)
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
    for (var x = 0; x < 10; x++)
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
      for (var x = 0; x < 10; x++)
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
  var self = this;
  self.shape = null;
  self.choice = 0;
  self.draw = false;
  self.x = 0;
  self.y = 0;
  self.create_blocks = function()
  {
    var blocks = new Array(4);
    for (i = 0; i < 4; i++)
    {
      blocks[i] = new Array(4);
    }
    return blocks;
  },
  self.blocks = self.create_blocks();
  self.change_shape = function(new_shape)
  {
    self.shape = new_shape;
    self.blocks = self.create_blocks();
    self.choice = 0;
    self.update_shape();
  };
  self.rotate = function(choice)
  {
    self.blocks = self.create_blocks();
    self.choice = choice;
    self.update_shape();
  };
  self.return_to_zero = function()
  {
    self.x = 0;
    self.y = 0;
  };
  self.modify_bulk = function(shape)
  {
    for (var i = 0; i < shape.length; i++)
    {
      self.modify_block(shape[i][0],shape[i][1],1);
    }
  },
  self.modify_block = function(x, y, i)
  {
   
    self.blocks[x][y] = i;
  },
  //get list of actual, suitable blocks
  self.get_list = function()
  {
    var suitable = new Array();
    for (var r = 0; r < 4; r++)
    {
      for (var c = 0; c < 4; c++)
      {
        if (self.blocks[r][c] == 1)
	{
          suitable.push([r,c]);
        }
      }
    }
    return suitable;
  }
  self.update_shape = function()
  {
    self.modify_bulk(self.shape.get_data(self.choice));
  };
  self.find_max_x = function()
  {
    var max = 0;
    for (var x = 0; x < 4; x++)
    {
      for (var y = 0; y <4; y++)
      {
        if (self.blocks[x][y] == 1)
        {
	  if(x > max)
	  {
	    max = x;
	  }
        }
      }
    }
    return max;
  };
  self.find_max_y = function()
  {
    var max = 0;
    for (var x = 0; x < 4; x++)
    {
      for(var y = 0; y < 4; y++)
      {
	if (self.blocks[x][y] == 1)
	{
          if (y > max)
          {
	    max = y;
          }
	}
      }
    }
    return max;
  };
  self.move = function(x_move,y_move)
  {
    self.x += x_move;
    self.y += y_move;
    if (self.x < 0 || self.rotation_collision_x() == true)
    {
      self.x -= x_move;
      return 1;
    }
    if (self.rotation_collision_y() == true)
    {
      self.y -= y_move;
      return 2;
    }
    return 0;
  };
  self.rotation_collision_y = function()
  {
    if (self.y > 380 - self.find_max_y() * 20)
    {
      return true;
    }
    return false;
  };
  self.rotation_collision_x = function()
  {
    if (self.x > 180 - (self.find_max_x() * 20))
    {
      return true;
    }
    return false;
  };
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

function getShape (choice)
{
  switch(choice)
  {
  case "l":
    {
      return new LShape();
    }
  case "s":
    {
      return new SShape();
    }
  case "o":
    {
      return new OShape();
    }
  case "z":
   {
      return new ZShape();
    }
  case "t":
    {
      return new TShape();
    }
  case "j":
    {
       return new JShape();
    }
  case "i":
    {
      return new IShape();
    }
  }
}
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

function Mode()
{
  this.status = 0;
  this.change = function(n)
  {
    this.status = n;
  }
}
function Engine(protocol)
{
  var self = this;
  var protocol = protocol;
  protocol.engine = self;
  self.current = new Tetromino();
  self.future = new Tetromino();
  self.field = new PlayField();
  self.score = 0;
  self.write_shape = function(name,choice,type)
  {
    if (type == 0)
    {
      if (self.current.shape != null)
      {
        self.field.insert_blocks(self.current.get_list(),self.current.x,self.current.y,self.current.shape.color);
      }
      self.current.return_to_zero();
      self.current.change_shape(getShape(name));
      self.current.draw = true;
    }
    else if (type == 1)
    {
      self.future.change_shape(getShape(name));
      self.future.choice = choice;
      self.future.update_shape();
      self.future.draw = true;
      self.change == false;
    }
    
  };
  //Update location.
  self.update_location = function(x,y)
  {
    self.current.x = x;
    self.current.y = y;
  };
  self.move = function(x,y)
  {
    self.current.move(x,y)
    var offset = self.field.calculate_positions(self.current.x,self.current.y);
    if (self.field.check(self.current.get_list(),offset[0],offset[1]) == false)
    {
      self.current.move(-x,-y);
    }
  };
  self.rotate = function(choice)
  {
    self.current.rotate(choice);
  };
  self.line_action = function(line)
  {
    self.field.move_lines(self.field.clear_line(line));
  };
};


void setup()
{
  size(800,600);
  stroke(255);
  PFont font= loadFont("monospace");
  textFont(font,18);
  frameRate(24);
}
var mode = new Mode();
var drawShape = new TetrominoDraw();
var drawField = new PlayFieldDraw();
var timer = new TimerAction();
var score_data = new HighScore();
var network = new Net();
var over = new GameOver();
var title = new TitleScreen();
network.initialize();
var game_protocol = new GameProtocol(network);
var score_protocol = new ScoreProtocol(network);
timer.addAction("network",60);
var engine = new Engine(game_protocol);

void drawInstruction()
{
  text("Instruction: ",450,50);
  text("a - left",450,80);
  text("s - down",450,100);
  text("d - right",450,120);
  text("w - rotate",450,140);
}

//Workaround for HTTP connections being droped after two minutes. Tried many settings to keep the connection alive to no avail. However, constant sending every minute does seem to keep the connection alive. This bug may not affect machines outside of the original's developer.


void gameDisplay()
{
  background(0,0,0);
  stroke(205,201,201);
  fill(0,0,0);
  rect(drawField.x,drawField.y,drawField.width,drawField.height)
  stroke(255,255,255);
  fill(255,255,255);
  if (engine.current.draw == true)
  {
    drawShape.create_blocks(engine.current.get_list(),engine.current.x,engine.current.y,engine.current.shape.color);
    text("Current: ",300,135);
    drawShape.create_blocks(engine.current.get_list(),250,100,engine.current.shape.color);
  }
  text("Next: ", 300,250);
  if (engine.future.draw == true)
  {
    drawShape.create_blocks(engine.future.get_list(),250,210,engine.future.shape.color);
  }
  text("Score " + engine.score,300,50);
  drawInstruction();
  drawShape.draw_field(engine.field.field);
}

void sendAlive()
{
  if (timer.getEvent() == "network")
  {
    network.sendAlive();
  }
}

void draw()
{
  timer.react();
  sendAlive();
  switch(mode.status)
  {
  case 0:
    title.display();
    break;
  case 4:
    gameDisplay();
    break;
  case 1:
    over.display();
    break;
  case 2:
    board.display();
    break;
  case 3:
    score_data.display();
    break;
  }
}
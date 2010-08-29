
function LobbyProtocol(net,lobby)
{
  var self = this;
  self.mode = lobby
  self.net = net;
  self.net.lobby = self;
  self.process_data = function(data)
  {
    switch(data[0])
    {
    case 1:
      console.log("Typing detected.");
      self.mode.chat.add_message(data[1]);
      break;
    case 2:
      self.mode.chat.add_message("Nick change unsuccessful.");
      break;
    case 3:
      self.mode.chat.add_message("Nick change successful.");
      break;
    }
  };
  self.send = function(message)
  {
    var data = [1,1,message];
    self.net.send(data);
  };

  self.nick = function(nick)
  {
    var data = [1,2,nick];
    self.net.send(data);
  };
}function Instruction()
{
  var self = this;
  self.display = function()
  {
    text("Instruction: ",50,500);
    text("a - left",50,530);
    text("s - down",50,550);
    text("d - right",50,570);
    text("w - rotate",50,590);
  };
}
function PlayButton()
{
  var self = this;
  self.play = new RectObject(450,20,100,50);
  self.display = function()
  {
    noFill();
    textFont(font,25);
    self.play.draw();
    text("Play",475,55);
  };
}
function RectObject(x,y,width,height)
{
  var self = this;
  self.x = x;
  self.y = y;
  self.width = width;
  self.height = height;
  self.draw = function()
  {
    rect(self.x,self.y,self.width,self.height)
  };
}
function Chat()
{
  var self = this;
  self.messages = new Array();
  self.message = new Text();
  self.protocol = null;
  self.scroll = 0;
  self.limit = 550f;
  self.horizontal = 0;
  self.display = function()
  {
    var y = 20;
    textFont(font,18);
    for (var i = self.scroll;i < self.messages.length;i++)
    {
      text(self.messages[i],5,y+= 20);
      if (y >= 550)
      {
	y -= 20;
	return;
      }
    }
    text(self.message.get_text(),self.horizontal,600);
    //pointer
    //fill()
    //rect(self.message.get_text().length * 10,580,10,20)
  };
  self.down = function()
  {
    self.scroll += 1;
  };
  self.up = function()
  {
    self.scroll -= 1;
  };
  //left and right cannot be used since we can't know how long our texts are when draw, at least for the time being.
  self.left = function()
  {
    self.horizontal -= 1;
  }
  self.right = function()
  {
    self.horizontal += 1;
  };
  self.listen_game = function(msg)
  {
    if(msg.match(/ game$/))
    {
      game_protocol.request_game();
      return true;
    }
    return false
  };
  self.parse = function(msg)
  {
    if (msg.match(/^\/request/) != null)
    {
      if (self.listen_game(msg))
      {
	return true;
      }
      console.log("Request identified. Unclear argument.");
      return true;
    }
    if (msg.match(/^\/nick/) != null)
    {
      //if there is a space after the nick..then we will presume that the next will be the string.
      if (msg.match(/^\/nick /) != null)
      {
	// /nick is 6 characters long if you count the space. Therefore, index value of 6 is used for .substring
	var nick = msg.substring(6);
	if (nick.match(/\s/) == null)
	{
	  console.log("Nick is being changed to " + nick);
	  self.protocol.nick(nick);
	  return true;
	}
	console.log("Invalid nick.");
	return true;
      }
      console.log("Nick command with unclear argument.");
      return true;
    }
    return false;
  }
  self.enter = function()
  {
    var verify = self.parse(self.message.get_text());
    if (verify == false)
    {
      self.protocol.send(self.message.get_text());
    }
    self.message = new Text();
  };
  self.divide = function(msg)
  {
    var spilts = [];
    while(msg.length > 35)
    {
      var next_part = msg.substring(0,35);
      msg = msg.substring(34);
      spilts.push(next_part);
    }
    spilts.push(msg);
    return spilts;
  };
  self.add_message = function(msg)
  {
    var msgs = self.divide(msg);
    for (var i = 0;i < msgs.length;i++)
    {
      self.messages.push(msgs[i]);
      if (self.messages.length > 27)
      {
	self.down();
      }
    }
  };
}


//Data type is 2 for gameplay commands.
function GameProtocol(var net)
{
  var self = this;
  self.net = net;
  self.net.game = self;
  self.engine = null;
  self.lastMessage = null;
  self.request_game = function()
  {
    var data = [2,0];
    self.net.send(data);
  };
  self.move_right = function()
  {
    var data = [2,2,1];
    self.engine.move(20,0);
    self.net.send(data);
  };
  self.move_left = function()
  {
    var data = [2,2,2];
    self.engine.move(-20,0);
    self.net.send(data);
  };
  self.move_down = function()
  {
    var data = [2,2,3];
    self.engine.move(0,20);
    self.net.send(data);
  };
  self.rotate = function()
  {
    var data = [2,2,4];
    self.net.send(data);
  };
  self.process_data = function(var data)
  {
    switch(data[1])
    {
    //initialize game mode.
    case 0:
      console.log("Game initialized.");
      mode.change(4);
      self.engine.start(data[0]);
      break;
    case 1:
      //Get new shape.
      if (self.checkIdentical(data))
      {
        console.log("New shape, ordered.");
	self.engine.write_shape(data[0],data[2],data[3],data[4]);
        self.net.send([2,1]);
      }
      break;
    case 2:
      console.log("Movement detected.");
      //Get movement update for current.
      if (self.checkIdentical(data))
      {
	self.engine.update_location(data[0],data[2],data[3]);
	self.net.send([2,1]);
      }
      break;
    case 3:
      //Rotation.
      if (self.checkIdentical(data))
      {
	console.log("Rotation detected.");
	self.engine.rotate(data[0],data[2]);
	self.net.send([2,1]);
      }
      break;
    case 4:
      //Kill some lines.
      if (self.checkIdentical(data))
      {
	self.engine.line_action(data[0],data[2]);
      }
      break;
    case 5:
      //Get score data.
      if (self.checkIdentical(data))
      {
	self.engine.score = data[2];
      }
      break;
    case 6:
      self.engine.stop();
      self.net.send([3]);
      break;
    case 7:
      self.engine.high_score();
      self.net.send([3]);
      break;
    }
  };
  self.pushMessage = function(var data)
  {
    self.lastMessage = new Array();
    for (var i = 0;i < data.length;i++)
    {
      self.lastMessage.push(data[i]);
    };
  };
  self.checkIdentical = function(var data)
  {
    if (self.lastMessage == null || self.lastMessage != data.length - 1)
    {
      self.pushMessage(data);
      return true;
    }
    else
    {
      for (var i = 0;i < self.lastMessage.length;i++)
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

function PrivateButton()
{
  var self = this;
  self.private_session = new RectObject(450,75,100,50);
  self.display = function()
  {
    noFill();
    textFont(font,15);
    self.private_session.draw();
    text("Create Game",450,110);
  };
}
function RadioButton()
{
  var self = this;
  self.state = false;
  self.height = 10;
  self.width = 10;
  self.x = 0;
  self.y = 0;
  self.set = function(var x, var y)
  {
    self.x = x;
    self.y = y;
  };
  self.display = function()
  {
    stroke(255);
    ellipse(self.x,self.y,self.width,self.height);
    if (self.state == true)
    {
      stroke(0);
      ellipse(x,y,self.width / 2, self.height / 2);
    }
  };
  self.text = function(var message)
  {
    text(message,self.x + 15,self.y + 5);
  };
}
function CreateGameMode()
{
  var self = this;
  self.others = false;
  self.radio = new RadioButton();
  self.radio.set(20,40);
  self.players = function()
  {
    textFont(font,18);
    text("Single or two players?",0,18);
    self.radio.display();
    self.radio.text("Yes");
  };
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.players();
  };
}

function TitleMode()
{
  var self = this;
  self.connected = false;
  self.display = function()
  {
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,50);
    text("JStet",300,300);
    textFont(font,18);
    text("Press Enter to Connect.",260,325);
  };
  self.switch_mode = function()
  {
    if (self.connected == true)
    {
      mode.change(5);
    }
  };
}

function ScoreBoardMode(protocol)
{
  var self = this;
  self.protocol = protocol;
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
    var data = self.protocol.get_data();
    var y = 70;
    var limit = self.start + 20;
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
  self.net.score = self;
  self.change_data = function(data)
  {
    self.data = data;
  };
  self.get_data = function()
  {
    return self.data;
  };
  self.transmit_score = function(name,points)
  {
    //0 indicating score
    var message = [0,name];
    self.net.send(message);
  };
}


function Net()
{
  var self = this;
  self.ws = null;
  self.game = null;
  self.score = null;
  self.lobby = null;
  self.initialize = function()
  {
    self.ws = new WebSocket('ws://localhost:7000');
    self.ws.onmessage = function(event)
    {
      data = JSON.parse(event.data);
      //data[0] notates data types so we know how to process the data.
      //0 - Score
      //1 - Lobby
      //2 - Game
      //4 - Acknowledge
      switch (data[0])
      {
      case 0:
        self.score.change_data(data[1]);
	break;
      case 1:
	self.lobby.process_data(data[1]);
	break;
      case 2:
	self.game.process_data(data[1]);
	break;
      case 4:
	console.log("Acknowledged.");
	title.connected = true;
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

function HighScoreMode()
{
  var self = this;
  self.name = new Text();
  self.display = function()
  {
    background(0,0,0);
    noFill();
    rect(300,305,55,30);
    text("You have beaten a score in the worldwide top 100 ranking.",100,250);
    text("Please enter your 5 letters identifer.",200,275);
    text("Your identifer: ",250,300);
    text(self.name.string,300,325);
  };
  self.get_name = function()
  {
    return self.name;
  }
}
function Text()
{
  var self = this;
  self.string = "";
  self.clean = function()
  {
    self.string = "";
  };
  self.addLetter = function(letter,limit)
  {
    if (self.string.length != limit)
    {
      self.string += letter;
    }
  };
  self.destroy = function()
  {
    if (self.string.length != 0)
    {
      self.string = self.string.substring(0,self.string.length - 1);
    }
  };
  self.get_text = function()
  {
    return self.string;
  };
}
void chatKey()
{
  var info = typing();
  switch(info)
  {
  default:
    lobby.chat.message.addLetter(info);
    break;
  case -8:
    lobby.chat.message.destroy();
    break;
  case -13:
    lobby.chat.enter();
    break;
  case false:
    return;
    break;
  }
}
void titleKey()
{
  switch(key)
  {
  case 13:
    title.connected = true;
    network.initialize();
    break;
  }
}
void lobbyMouse()
{
  switch(lobby.collision.check(mouseX,mouseY))
  {
  case 0:
    {
      game_protocol.request_game();
      break;
    }
  case 1:
    {
      mode.change(6);
      break;
    }
  }
}

function Collision()
{
  var self = this;
  self.rect = [];
  self.check = function(x,y)
  {
    var conditions = [false,false];
    for (var i = 0;i < self.rect.length;i++)
    {
      if (x >= self.rect[i].x && x <= self.rect[i].x + self.rect[i].width)
      {
	conditions[0] = true;
      }
      if (y >= self.rect[i].y && y <= self.rect[i].y + self.rect[i].height)
      {
	conditions[1] = true;
      }
      if (conditions[0] == true && conditions[1] == true)
      {
	return i;
      }
    }
    return -1;
  };
  self.add_rect = function(rect)
  {
    self.rect.push(rect);
  };
}
void enterHighScoreKey()
{
  var info = typing();
  switch (info)
  {
  case false:
    break;
  case -8:
    high_score.name.destroy();
    break;
  case -13:
    score_protocol.transmit_score(high_score.get_name(),engine.score);
    high_score.name.clean();
    mode.change(2);
    break;
  default:
    high_score.name.addLetter(info);
    break;
  }
}

var type_status = false;

void typing()
{
  switch(key)
  {
  case 97:
    return("a");
    break;
  case 98:
    return("b");
    break;
  case 99:
    return("c");
    break;
  case 100:
    return("d");
    break;
  case 101:
    return("e");
    break;
  case 102:
    return("f");
    break;
  case 103:
    return("g");
    break;
  case 104:
    return("h");
    break;
  case 105:
    return("i");
    break;
  case 106:
    return("j");
    break;
  case 107:
    return("k");
    break;
  case 108:
    return("l");
    break;
  case 109:
    return("m");
    break;
  case 110:
    return("n");
    break;
  case 111:
    return("o");
    break;
  case 112:
    return("p");
    break;
  case 113:
    return("q");
    break;
  case 114:
    return("r");
    break;
  case 115:
    return("s");
    break;
  case 116:
    return("t");
    break;
  case 117:
    return("u");
    break;
  case 118:
    return("v");
    break;
  case 119:
    return("w");
    break;
  case 120:
    return("x");
    break;
  case 121:
    return("y");
    break;
  case 122:
    return("z");
    break;
  case 32:
    return(" ");
    break;
  case 33:
    return("!");
    break;
  case 34:
    return("\"");
    break;
  case 35:
    return("#");
    break;
  case 36:
    return("$");
    break;
  case 37:
    return("%");
    break;
  case 38:
    return("&");
    break;
  case 39:
    return("'");
    break;
  case 40:
    return("(");
    break;
  case 41:
    return(")");
    break;
  case 42:
    return("*");
    break;
  case 44:
    return(",");
    break;
  case 46:
    return(".");
    break;
  case 47:
    return("/");
    break;
  case 48:
    return("0");
    break;
  case 49:
    return("1");
    break;
  case 50:
    return("2");
    break;
  case 51:
    return("3");
    break;
  case 52:
    return("4");
    break;
  case 53:
    return("5");
    break;
  case 54:
    return("6");
    break;
  case 55:
    return("7");
    break;
  case 56:
    return("8");
    break;
  case 57:
    return("9");
    break;
  case 64:
    return("@");
    break;
  case 91:
    return("[");
    break;
  case 92:
    return("\\");
    break;
  case 93:
    return("]");
    break;
  case 94:
    return("^");
    break;
  case 96:
    return("`");
    break;
  case 123:
    return ("{");
    break;
  case 125:
    return ("}");
    break;
  case 186:
    return(";");
    break;
  case 187:
    return("=");
    break;
  case 188:
    return ("<");
    break;
  case 189:
    return("-");
    break;
  case 190:
    return(">");
  case 191:
    return("?");
    break;
  case 192:
    return("~");
    break;
  //backspace
  case 8:
    return -8;
    break;
  //enter
  case 13:
    return -13;
    break;
  //shift, ctrl, etc
  case 65535:
    return false;
    break;
  default: return key;
  }
}

function GameOverMode()
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
    game_protocol.request_game();
  }
  else if(key == 100)
  {
    mode.change(2);
  }
}
void mousePressed()
{
  switch(mode.status)
  {
  case 5:
    lobbyMouse();
    break;
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
    enterHighScoreKey();
    break;
  case 5:
    chatKey();
    break;
  }
}

void scoreKey()
{
  switch(key)
  {
  //n is restart the game
  case 110:
    game_protocol.request_game();
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
  this.start = function()
  {
    this.field = this.create_field();
  }
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

function LobbyMode()
{
  var self = this;
  self.chat = new Chat();
  self.play = new PlayButton();
  self.private_session = new PrivateButton();
  self.collision = new Collision();
  self.collision.add_rect(self.play.play);
  self.collision.add_rect(self.private_session.private_session);
  self.display = function()
  {
    background(0,0,0);
    self.chat.display();
    self.play.display();
    self.private_session.display();
    noFill();
    stroke(255);
    rect(0,580,800,20);
    rect(0,0,400,580);
  };
  self.switch_mode = function()
  {
    mode.change(4);
  };
}
function Mode()
{
  this.status = 0;
  this.change = function(n)
  {
    this.status = n;
  }
}
function Player()
{
  var self = this;
  self.current = new Tetromino();
  self.id = 0;
  self.future = new Tetromino();
  self.field = new PlayField();
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
  self.start = function()
  {
    self.current = new Tetromino();
    self.future = new Tetromino();
    self.field.start();
  };
}
PFont font = loadFont("monospace")
void setup()
{
  size(800,600);
  stroke(255);
  textFont(font,18);
  frameRate(24);
}

function Engine(protocol,mode)
{
  var self = this;
  self.protocol = protocol;
  self.mode = mode;
  self.players = [];
  self.you = 0;
  protocol.engine = self;
  self.score = 0;
  self.find_player = function(id)
  {
    for (var i = 0;i < self.players.length;i++)
    {
      if (self.players[i].id == id)
      {
	return self.players[i];
      }
    }

  };
  self.write_shape = function(id,name,choice,type)
  {
    var player = self.find_player(id);
    player.write_shape(name,choice,type);
  };
  //Update location.
  self.update_location = function(id,x,y)
  {
    var player = self.find_player(id);
    player.current.x = x;
    player.current.y = y;
  };
  self.move = function(x,y)
  {
    var player = self.find_player(self.you);
    player.current.move(x,y);
    var offset = player.field.calculate_positions(player.current.x,player.current.y);
    if (player.field.check(player.current.get_list(),offset[0],offset[1]) == false)
    {
      player.current.move(-x,-y);
    }
  };
  self.rotate = function(id,choice)
  {
    var player = self.find_player(id);
    player.current.rotate(choice);
  };
  self.line_action = function(id,line)
  {
    var player = self.find_player(id);
    player.field.move_lines(player.field.clear_line(line));
  };
  self.stop = function()
  {
    console.log("Game over");
    self.mode.change(1);
  };
  self.high_score = function()
  {
    console.log("High score, detected!");
    self.mode.change(3);
  };
  self.start = function(id)
  {
    new_player = new Player();
    new_player.start();
    new_player.id = id;
    self.players.push(new_player);
    self.you = id;
  };
  self.get_player = function(n)
  {
    return self.players[n];
  };
};

function EngineDraw()
{
  var self = this;
  self.instruction = new Instruction();
  self.drawField = new PlayFieldDraw();
  self.drawShape = new TetrominoDraw();
  self.display = function()
  {
    textFont(font,18);
    background(0,0,0);
    stroke(205,201,201);
    fill(0,0,0);
    //player one...
    text("Player One",75,50);
    rect(self.drawField.x,self.drawField.y,self.drawField.width,self.drawField.height); //playfield
    rect(self.drawField.x + self.drawField.width,self.drawField.y,100,self.drawField.height); //Info display field
    //player two
    text("Player Two",75,450);
    rect(self.drawField.x + 400,self.drawField.y,self.drawField.width,self.drawField.height); //playfield
    rect(self.drawField.x + 400 + self.drawField.width,self.drawField.y,100,self.drawField.height); //Info display field
    self.instruction.display();
    self.player_one();
    self.score();
  };
  self.player_one = function()
  {
    var one = engine.get_player(0);
    if (one.current.draw == true)
    {
      self.drawShape.create_blocks(one.current.get_list(),one.current.x,one.current.y,one.current.shape.color);
      text("Current: ",250,135);
      self.drawShape.create_blocks(one.current.get_list(),225,100,one.current.shape.color);
    }
    text("Next: ", 250,250);
    if (one.future.draw == true)
    {
      self.drawShape.create_blocks(one.future.get_list(),225,210,one.future.shape.color);
    }
    self.drawShape.draw_field(one.field.field);
  };
  self.score = function()
  {
    text("Score", 350,18);
    text("P1: " + engine.score,350,35);
    text("Player One",75,50);
  };
}

var mode = new Mode();
var timer = new TimerAction();
var high_score = new HighScoreMode();
var lobby = new LobbyMode();
var network = new Net();
var over = new GameOverMode();
var title = new TitleMode();
var create = new CreateGameMode();
var game_protocol = new GameProtocol(network);
var score_protocol = new ScoreProtocol(network);
var lobby_protocol = new LobbyProtocol(network,lobby);
lobby.chat.protocol = lobby_protocol;
var board = new ScoreBoardMode(score_protocol);
timer.addAction("network",60);
var engine = new Engine(game_protocol,mode);
var engineDraw = new EngineDraw();
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
  timer.react();
  sendAlive();
  switch(mode.status)
  {
  case 0:
    title.display();
    title.switch_mode();
    break;
  case 4:
    engineDraw.display();
    break;
  case 1:
    over.display();
    break;
  case 2:
    board.display();
    break;
  case 3:
    high_score.display();
    break;
  case 5:
    lobby.display();
    break;
  case 6:
    create.display();
    break;
  }
}
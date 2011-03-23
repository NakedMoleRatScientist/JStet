
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
function GameInfo(var password,var name)
{
  var self = this;
  self.password = password;
  self.name = name;
}

function TextButton(var string,var size,var x, var y)
{
  var self = this;
  self.string = string;
  self.size = size;
  self.x = x;
  self.y = y;
  self.rect = new RectObject(x,y,size,size / 2);
  self.display = function()
  {
    noFill();
    textFont(font,self.size / 5);
    text(self.string,self.x + (self.size / 4),self.y + (self.size / 4));
    self.rect.draw();
  };
}

function RectObject(x,y,width,height)
{
  var self = this;
  self.ui = new UiObject(self,0);
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
  self.message = new Input();
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
    self.message = new Input();
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
  self.setup = function()
  {
    var data = [2,6];
    self.net.send(data);
  };
  self.request_multi = function(var password, var name)
  {
    if (password == "")
    {
      password = null;
    }
    var data = [2,3,name,password];
    self.net.send(data);
  };
  //confirm to tell the server the player is ready to play
  self.confirm = function()
  {
    var data = [2,5];
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
    console.log(data[1]);
    switch(data[1])
    {
    case 0:
      console.log("Game initialized.");
      self.net.send([2,5]);
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
      //destruction of the game
      self.engine.stop(self.engine.you);
      self.net.send([3]);
      break;
    case 7:
      //destruction of the game; high score
      self.engine.stop(self.engine.you);
      self.engine.high_score();
      self.net.send([3]);
      break;
    case 8:
      //change into game mode
      self.engine.state = 1;
      self.engine.start(data[0]);
      mode.change(4);
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

function SecureEffects(var pages, var secure)
{
  var self = this;
  self.pages = pages;
  self.secure = secure;
  self.effect = new Effect(self);
  self.check = function(object)
  {
    if (object.type == 2)
    {
      join_protocol.request_join(self.pages.data.get("name"),self.input.string);
    }
  };
}

function PassEffects(var pages, pass)
{
  var self = this;
  self.pass = pass;
  self.pages = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 2)
    {
      if (self.pass.state == 0)
      {
	self.pages.data.update("password",self.input.string);
	self.pages.act();
	self.input.clean();
      }
      else
      {
	if (self.pages.data.get("password") == self.input.string)
	{
	  game_protocol.request_multi(self.pages.data.get("password"),self.pages.data.get("name"));
	  waiting.password = self.pages.data.get("password");
	  mode.change(7);
	}
	else
	{
	  self.pass.state = 2;
	}
      }
    }
    else if(object.type == 0)
    {
      if (self.pass.state == 2)
      {
	self.state = 0;
      }
    }
  };
}

function PasswordEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.status = 0;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 3 && self.status == 1)
    {
      game_protocol.request_multi(self.pages.data.get("password"),self.pages.data.get("name"));
      mode.change(7);
    }
    else if(object.type == 1)
    {
      if (object.member == 0)
      {
	self.status = 0;
      }
      else if(object.member == 1)
      {
	self.status = 1;
      }
    }
  };
}

function SubmitEffects(var pages,radio)
{
  var self = this;
  self.pages = pages;
  self.radio = radio;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      if (self.radio.which_key() == 1)
      {
	self.pages.act();
      }
      else if (self.radio.which_key()== 0)
      {
	self.pages.collision.send(new TurnEvent());
      }
    }
  };
}

function NameEffects(var pages)
{
  var self = this;
  self.pages = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 2)
    {
      self.pages.data.update("name",self.input.string);
      self.pages.act();
    }
  };
}

function JoinPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.name = self.pages.data.get("name");
    self.yes = new TextButton("Yes",100,300,300);
    self.no = new TextButton("No",100,400,300);
    self.effects = new JoinEffects(self,self.pages);
    self.effects.add(self.yes.rect);
    self.effects.add(self.no.rect);
    self.pages.collision.effects.add_effect(self.effects);
  };
  self.call = function()
  {
    textFont(font,18);
    text("Do you wish to join the game: " + self.name,280,280);
    self.yes.display();
    self.no.display();
  };
  self.key = function()
  {
    
  };
}

function GameListPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.pointer = 0;
  self.initialize = function()
  {
    self.refresh = new TextButton("Refresh",100,450,20);
    self.effects = new ListEffects(self);
    self.effects.add(self.refresh.rect);
    self.pages.collision.effects.add_effect(self.effects);
  };
  self.games = function()
  {
    text("Available Games" + " " + "p",112,80);
    line(100,85,310,85);
    line(280,70,280,400);
    line(310,70,310,400);
    var increment = 100;
    var games = list_protocol.games;
    for (var i = 0; i < games.length; i++)
    {
      text(games[i].name,100,increment);
      if (games[i].password == true)
      {
	rect(285,increment - 10,10,10);
      }
      increment += 18;
    }
    if (games.length > 0)
    {
      ellipse(330,95 + (self.pointer * 16),10,10);
    }
  };
  self.enter = function()
  {
    self.pages.data.update("password",list_protocol.games[self.pointer].password);
    self.pages.data.update("name",list_protocol.games[self.pointer].name);
    self.pages.next();
  };
  self.size = function()
  {
    text("There are " + list_protocol.size + " game(s) running",0,18);
  };
  self.call = function()
  {
    textFont(font,18);
    self.size();
    self.games();
    self.refresh.display();
  };
  self.key = function()
  {
    if (list_protocol.games.length > 0)
    {
      var size = list_protocol.games.length - 1;
    }
    else
    {
      var size = 0;
    }
    switch(key)
    {
      //arrow key up
    case 119:
      {
	if (self.pointer > 0)
	{
	  self.pointer -= 1;
	}
	break;
      }
    case 115:
      {
	if (self.pointer < size)
	{
	  self.pointer += 1;
	}
	break;
      }
    case 10:
      {
	self.enter();
	break;
      }
    }
  };
}

function NamePage(var pages)
{
  var self = this;
  self.pages = pages;
  self.state = 0;
  self.initialize = function()
  {
    self.yes = new RadioButton();
    self.yes.set(300,220);
    self.no = new RadioButton();
    self.no.set(400,220);
    self.radio_switch = new RadioSwitch();
    self.radio_switch.add(self.yes);
    self.radio_switch.add(self.no);
    self.submit = new TextButton("Submit",100,350,270);
    self.name = new NameEffects(self.pages);
    self.name.add_input();
    self.submit_effects = new SubmitEffects(self.pages,self.radio_switch);
    self.submit_effects.add(self.submit.rect);
    self.pages.collision.effects.add_effect(self.name);
    self.pages.collision.effects.add_effect(self.radio_switch);
    self.pages.collision.effects.add_effect(self.submit_effects);
  };
  self.call = function()
  {
    textFont(font,18);
    if (self.state == 0)
    {
      self.name.type = true;
      self.type_text();
    }
    else
    {
      self.name.type = false;
      self.confirm_text();
    }
  };
  self.type_text = function()
  {
    text("What do you wish the name of the game to be?",150,210);
    text(self.name.input.string,170,240);
    text("When you're done, presse enter",180,265);
    rect(170,220,400,25);
  };
  self.confirm_text = function()
  {
    text("Name of the game is.. " + self.pages.data.get("name"),150,190);
    text("Is this the name of the game you wish it to be?",150,210);
    self.yes.text("Yes");
    self.yes.display();
    self.no.text("No");
    self.no.display();
    self.submit.display();
  };
  self.act = function()
  {
    if (self.state == 0)
    {
      self.state = 1;
    }
    else
    {
      self.state = 0;
    }
  };
  self.key = function()
  {
    if (self.state == 0)
    {
      activeType(self.name);  
    }
  };
}

function PassEntryPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.effects = new PassEffects(self.pages,self);
    self.effects.add_input();
    self.effects.type = true;
    self.state = 0;
    self.retry = new TextButton("Retry",100,350,350);
    self.effects.add(self.retry.rect);
    self.pages.collision.effects.add_effect(self.effects);
  };
  self.call = function()
  {
    textFont(font,18);
    if (self.state == 0)
    {
      self.first_stage();
    }
    else if (self.state == 1)
    {
      self.second_stage();
    }
    else
    {
      self.effects.input.clean();
      self.effects.type = false;
      self.fail_pass();
    }
    text(self.effects.input.string,150,300);    
  };
  self.first_stage = function()
  {
    text("After you're done, press enter.",200,360);
    text("Please type your password for the other player.", 100, 250);
  };
  self.second_stage = function()
  {
    text("Please retype the password again. Press enter when you're done.",100,250);
  };
  self.fail_pass = function()
  {
    text("Password mismatch error.",100,250);
    text("press enter to restart password entry.",100,270);
  };
  self.key = function()
  {
    if (self.state == 2)
    {
      switch(key)
      {
      case 10:
	self.state = 0;
	self.effects.type = true;
      }
    }
    else
    {
      activeType(self.effects);
    }
  };
  self.act = function()
  {
    if (self.state == 0)
    {
      self.state = 1;
      self.effects.input.clean();
    }
    else if(self.state == 1)
    {
      self.state = 0;
      self.effects.input.clean();
    }
  };
}


function PasswordPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.yes = new RadioButton();
    self.no = new RadioButton();
    self.yes.set(20,50);
    self.no.set(80,50);
    self.radio_switch = new RadioSwitch();
    self.radio_switch.add(self.yes);
    self.radio_switch.add(self.no);
    self.pages.collision.effects.add_effect(self.radio_switch);
    self.pages.collision.effects.add_effect(new PasswordEffects(self.pages));
  };
  self.call = function()
  {
    textFont(font,18);
    text("Since you choose two players...",0,18);
    text("Do you wish to password-protect for someone?",0,36);
    self.yes.display();
    self.yes.text("Yes");
    self.no.text("No");
    self.no.display();
    self.pages.display();
  };
  self.key = function()
  {
    
  };
}

function JoinEffects(var page, var pages)
{
  var self = this;
  self.page = page;
  self.pages = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    switch (object.type)
    {
    case 0:
      if (object.member == 1)
      {
	self.pages.back();
      }
      else
      {
	if (self.pages.data.get("password") == false)
	{
	  game_protocol.request_join(self.pages.data.get("game"));
	}
	else
	{
	  self.pages.next();
	}
      }
      break;
    }
  };
}

function ListEffects(var page)
{
  var self = this;
  self.page = page;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      list_protocol.request_size();
      list_protocol.request_games();
    }
  };
}

function PlayersEffects(var pages)
{
  var self = this;
  self.page = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 1)
    {
      self.update_players(object);
    }
    else if (object.type == 3)
    {
      self.end();
    }
  };
  self.update_players = function(var object)
  {
    if (object.member == 0)
    {
      self.page.data.update("players",1);
    }
    else
    {
      self.page.data.update("players",2);
    }
  };
  self.end = function(var object)
  {
    if (self.page.data.get("players") == 1)
    {
      game_protocol.request_game();
    }
  };
}

function SecurePage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.effects = new SecureEffects(self.pages,self);
    self.effects.add_input();
    self.effects.type = true;
    self.pages.collision.effects.add_effect(self.effects);
  };
  self.call = function()
  {
    textFont(font,18);
    text("Please enter the password for this game",300,300);
    text(self.effects.input.string,300,330);
  };
  self.key = function()
  {
    activeType(self.effects);
  };
}

function PlayersPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.one = new RadioButton();
    self.one.set(20,40);
    self.two = new RadioButton();
    self.two.set(90,40);
    self.radio_switch = new RadioSwitch();
    self.radio_switch.add(self.one);
    self.radio_switch.add(self.two);
    self.pages.collision.effects.add_effect(self.radio_switch);
    self.pages.collision.effects.add_effect(new PlayersEffects(self.pages));    
  };
  self.call = function()
  {
    textFont(font,18);
    text("Single or two players?",0,18);
    self.one.display();
    self.one.text("One");
    self.two.display();
    self.two.text("Two");
    self.pages.display();
  };
  self.key = function()
  {
  };
}

function Info(var name)
{
  var self = this;
  self.name = name;
  self.value = "nothing";
}

function DataCollect()
{
  var self = this;
  self.data = [];
  self.create = function(var name)
  {
    self.data.push(new Info(name));
  };
  self.find = function(var name)
  {
    for (var i = 0; i < self.data.length; i++)
    {
      if (self.data[i].name == name)
      {
	return i;
      }
    }
    return -1;
  };
  self.insert = function(var i, var info)
  {
    if (i == -1)
    {
      console.log("name is false.");
      return false;
    }
    self.data[i].value = info;
  };
  self.update = function(var name, var info)
  {
    self.insert(self.find(name), info);
  };
  self.get = function(var name)
  {
    return self.data[self.find(name)].value;
  };
}

function TurnEvent()
{
  var self = this;
  self.type = 3;
}

function PageEffect(var pages)
{
  var self = this;
  self.pages = pages;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 3)
    {
      self.pages.next();
    }
  };
}


function Pages()
{
  var self = this;
  self.collision = new Collision();
  self.pages = [];
  self.on = 0;
  self.turn = new TextButton("turn",100,500,500);
  self.turn.rect.type = 3;
  self.effect = new PageEffect(self);
  self.effect.add(self.turn.rect);
  self.data = new DataCollect();
  self.forward = function ()
  {
    self.on ++;
    if (self.on > self.pages.length - 1)
    {
      self.on --;
    }
  }
  self.key = function()
  {
    self.pages[self.on].key();
  };
  self.backward = function ()
  {
    self.on --;
    if (self.on < 0)
    {
      self.on ++;
    }
  }
  self.new_page = function()
  {
    self.collision = new Collision();
    self.initialize();
  }
  self.back = function()
  {
    self.backward();
    self.new_page();
  };
  self.next = function()
  {
    self.forward();
    self.new_page();
  };
  self.display = function()
  {
    self.turn.display();
  };
  self.run = function()
  {
    self.pages[self.on].call();
  };
  self.add = function(var object)
  {
    self.pages.push(object);
  };
  self.initialize = function()
  {
    self.pages[self.on].initialize();
    self.collision.effects.add_effect(self.effect);
  };
  self.act = function()
  {
    self.pages[self.on].act();
  };
}

function RadioSwitch()
{
  var self = this;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 1)
    {
      for(var i = 0; i < self.elements.length; i++)
      {
	if (i != object.member)
	{
	  self.elements[i].state = false;
	}
	else
	{
	  self.elements[i].state = true;
	}
      }
    }
  };
  self.which_key = function()
  {
    for (var i = 0; i < self.elements.length; i++)
    {
      if (self.elements[i].state == true)
      {
	return i;
      }
    }
    return -1;
  };
}

function RadioButton()
{
  var self = this;
  self.ui = new UiObject(self,1);
  self.state = false;
  self.height = 10;
  self.width = 10;
  self.radius = self.height / 2;
  self.diameter = self.radius * 2;
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
      stroke(255);
      ellipse(self.x,self.y,self.width / 2, self.height / 2);
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
  self.pages = new Pages();
  self.pages.data.create("players");
  self.pages.data.create("password");
  self.pages.data.create("name");
  self.pages.add(new PlayersPage(self.pages));
  self.pages.add(new NamePage(self.pages));
  self.pages.add(new PasswordPage(self.pages));
  self.pages.add(new PassEntryPage(self.pages));
  self.pages.initialize();
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.pages.run()
  };
  self.key = function()
  {
    self.pages.key();
  };
}


function TitleMode()
{
  var self = this;
  self.connected = false;
  self.key = function()
  {
    switch(key)
    {
    case 10:
      title.connected = true;
      network.initialize();
      break;
    }
  };
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
  self.key = function()
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
  };
}


function JoinProtocol(var net)
{
  var self = this;
  self.net = net;
  self.net.join = self;
  self.state = 0;
  self.request_join = function(var name,var pass)
  {
    var data = [5,0,name,pass];
    self.net.send(data);
  };
  self.process_data = function(var data)
  {
    switch(data[0])
    {
    case 0:
      {
	self.state = 1;
	break;
      }
    case 1:
      {
	engine.start(data[1]);
	engine.create(data[2]);
	mode.change(4);
	break;
      }
    }
  };
}

function SearchProtocol(var net)
{
  var self = this;
  self.net = net;
  self.process_data = function(var data)
  {
    switch(data[1])
    {
    case 0:
      console.log("Search initialized.");
    }
  };
  self.request_search = function()
  {
    var data = [3,0];
    self.net.send(data);
  };
}

function ListProtocol(var net)
{
  var self = this;
  self.net = net;
  self.net.list = self;
  self.size = 0;
  self.games = [];
  //Get size of games.
  self.request_size = function()
  {
    var data = [4,0];
    self.net.send(data);
  };
  //Get games info.
  self.request_games = function()
  {
    var data = [4,1];
    self.net.send(data);
  };
  self.process_data = function(var data)
  {
    switch(data[0])
    {
    case 0:
      {
	//update game size.
	self.size = data[1];
	break;
      }
    case 1:
      {
	//update games
	self.games = [];
	self.games.push(new GameInfo(data[1][0][1],data[1][0][0]));
	break;
      }
    case 2:
      {
	console.log("Nothing found.");
	break;
      }
    }
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
  self.list = null;
  self.join = null;
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
      //5 - list
      //6 - join
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
      case 5:
	self.list.process_data(data[1]);
	break;
      case 6:
	self.join.process_data(data[1]);
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
  self.name = new Input();
  self.display = function()
  {
    textFont(font,18);
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
  self.key = function()
  {
    var info = typing();
    switch (info)
    {
    case false:
      break;
    case -8:
      high_score.name.destroy();
      break;
    case -10:
      score_protocol.transmit_score(high_score.get_name(),engine.score);
      high_score.name.clean();
      mode.change(2);
      break;
    default:
      high_score.name.addLetter(info);
      break;
    }
  };
}

function Input()
{
  var self = this;
  self.ui = new UiObject(self,2);
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

void listMouse()
{
  list.pages.collision.check(mouseX,mouseY);
}

void createMouse()
{
  create.pages.collision.check(mouseX,mouseY);  
}

void lobbyMouse()
{
  lobby.collision.check(mouseX,mouseY); 
}

function CollisionEffects(var collision)
{
  var self = this;
  self.collision = collision;
  self.effects = [];
  self.add_effect = function(var object)
  {
    object.use(self.collision);
    self.effects.push(object);
  }
  self.check = function(var n)
  {
    for (var i = 0; i < self.effects.length; i++)
    {
      self.effects[i].check(n);
    }
  };
  self.clean = function()
  {
    self.effects = [];
  };
}


function Collision()
{
  var self = this;
  self.elements = [];
  self.effects = new CollisionEffects(self);
  self.check_rect = function(var x, var y, var i)
  {
    var conditions = [false,false];
    if (x >= self.elements[i].x && x <= self.elements[i].x + self.elements[i].width)
    {
      conditions[0] = true;
    }
    if (y >= self.elements[i].y && y <= self.elements[i].y + self.elements[i].height)
    {
      conditions[1] = true;
    }
    if (conditions[0] == true && conditions[1] == true)
    {
      return true; 
    }
    else
    {
      return false;
    }
  };
  //Using the pythagorean theorm to do circle/mouse collision detection
  self.check_circle = function(var x,var y, var i)
  {
    var dy = y - (self.elements[i].y + self.elements[i].diameter / 2);
    var dx = x - (self.elements[i].x + self.elements[i].diameter / 2);
    var dm = Math.sqrt(dx * dx + dy * dy);
    if (dm <= self.elements[i].diameter)
    {
      return true;
    }
    else
    {
      return false;
    }
  };
  self.add = function(var object)
  {
    self.elements.push(object);
  };
  self.check = function(var x, var y)
  {
    for (var i = 0; i < self.elements.length; i++)
    {
      if (self.elements[i].type == 0 || self.elements[i].type == 3)
      {
	if (self.check_rect(x,y,i) == true)
	{
	  self.send(self.elements[i]);
	}
      }
      else if(self.elements[i].type == 1)
      {
	if (self.check_circle(x,y,i) == true)
	{
	  self.send(self.elements[i]);
	}
      }
    }
  };
  self.send = function(var object)
  {
    self.effects.check(object);
  };
}

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
  case 10:
    return -10;
    break;
    //shift, ctrl, etc
  case 65535:
    return false;
    break;
  default:
    return key;
    break;
  }
  return false;
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
  self.key = function()
  {
    if (key == 110)
    {
      game_protocol.request_game();
    }
    else if(key == 100)
    {
      mode.change(2);
    }
  };
}

void mousePressed()
{
  switch(mode.status)
  {
  case 5:
    lobbyMouse();
    break;
  case 6:
    createMouse();
    break;
  case 8:
    listMouse();
    break;
  }
}

void keyPressed()
{
  switch(mode.status)
  {
  case 0:
    title.key();
    break;
  case 4:
    engine.key();
    break;
  case 5:
    lobby.key();
    break;
  case 6:
    create.key();
    break;
  case 8:
    list.key();
    break;
  case 1:
    over.key();
    break;
  case 2:
    score.key();
    break;
  case 3:
    high_score.key();
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
  var self = this;
  self.x = 50;
  self.y = 50;
  self.width = 200;
  self.height = 400;
  self.display = function()
  {
    rect(self.x,self.y,self.width,self.height);
    rect(self.x + self.width,self.y,100,self.height);
  };
  self.display_offset = function(var x)
  {
    rect(self.x + x,self.y,self.width,self.height);
    rect(self.x + x + self.width,self.y,100,self.height);
  };
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

function LobbyEffects()
{
  var self = this;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      if (object.member == 0)
      {
	game_protocol.request_game();
      }
      else if (object.member == 1)
      {
	mode.change(6);
      }
      else if (object.member == 2)
      {
	list_protocol.request_size();
	list_protocol.request_games();
	mode.change(8);
      }
    }
  };
}

function activeType(var effect)
{
  var self = effect;
  var info = typing();
  self.check_type(info);
}

function Effect(var parent)
{
  var self = parent;
  self.elements = [];
  self.counter = 0;
  self.type == false;
  self.input = new Input();
  self.add = function(var button)
  {
    button.member = self.counter;
    self.counter ++;
    self.elements.push(button);
  };
  self.use = function(var collision)
  {
    self.collision = collision;
    for (var i = 0; i < self.elements.length; i++)
    {
      self.collision.add(self.elements[i]);
    }
  };
  self.check_type = function(var info)
  {
    if (self.type == true)
    {
      if (info == -8)
      {
	self.input.destroy();
      }
      else if (info == -10)
      {
	self.type_enter();
      }
      else if(info == false)
      {
	return;
      }
      else
      {
	self.input.addLetter(info);
      }
    }
  };
  self.type_enter = function()
  {
    self.collision.effects.check(self.input);
  };
  self.add_input = function()
  {
    self.add(self.input);
  };
}

function UiObject(var parent, var t)
{
  var self = parent;
  self.member = 0;
  self.type = t;
}

function LobbyMode()
{
  var self = this;
  self.chat = new Chat();
  self.play = new TextButton("Play",100,450,20);
  self.session = new TextButton("Create Game",100,450,75);
  self.find = new TextButton("Join",100,450,130);
  self.effect = new LobbyEffects();
  self.collision = new Collision();
  self.effect.add(self.play.rect);
  self.effect.add(self.session.rect);
  self.effect.add(self.find.rect);
  self.collision.effects.add_effect(self.effect);
  self.display = function()
  {
    background(0,0,0);
    self.chat.display();
    self.play.display();
    self.session.display();
    self.find.display();
    noFill();
    stroke(255);
    rect(0,580,800,20);
    rect(0,0,400,580);
  };
  self.key = function()
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
    case -10:
      lobby.chat.enter();
      break;
    case false:
      return;
      break;
    }
  }; 
}

function ListGameMode()
{
  var self = this;
  self.pages = new Pages();
  self.pages.data.create("name");
  self.pages.data.create("password");
  self.pages.add(new GameListPage(self.pages));
  self.pages.add(new JoinPage(self.pages));
  self.pages.add(new SecurePage(self.pages));
  self.pages.initialize();
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.pages.run();
  };
  self.key = function()
  {
    self.pages.key();
  };
}

function WaitingMode()
{
  var self = this;
  self.password = null;
  self.display = function()
  {
    background(0,0,0);
    textFont(font,18);
    text("Waiting for another player to join...",250,330);
    if (self.password != null)
    {
      text("Give the password below and give it to your friend.",250,370);
      text(self.password,250,390);
      rect(250,380,200,20);
    }
  };
}

function SearchUi()
{
  var self = this;
  self.animate = 0;
  self.animate_one = function()
  {
    
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

var mode = new Mode();
var timer = new TimerAction();
var high_score = new HighScoreMode();
var lobby = new LobbyMode();
var network = new Net();
var over = new GameOverMode();
var title = new TitleMode();
var waiting = new WaitingMode();
var list = new ListGameMode();
var create = new CreateGameMode();
var game_protocol = new GameProtocol(network);
var score_protocol = new ScoreProtocol(network);
var lobby_protocol = new LobbyProtocol(network,lobby);
var list_protocol = new ListProtocol(network);
var join_protocol = new JoinProtocol(network);
lobby.chat.protocol = lobby_protocol;
var board = new ScoreBoardMode(score_protocol);
timer.addAction("network",60);
var engine = new Engine(game_protocol,mode);
var engineDraw = new EngineDraw();

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
}function EngineDraw()
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
    self.ready();
    self.field_draw_mode();
    self.instruct();
    self.decide_draw();
    self.score();
  };
  self.player_one_field = function()
  {
    text("Player One",75,50);
    self.drawField.display();
  };
  self.player_two_field = function()
  {
    text("Player Two",75,450);
    self.drawField.display_offset(400);
  };
  self.field_draw_mode = function()
  {
    self.player_one_field();
    if (engine.players.length == 2)
    {
      self.player_two_field();
    }
  };
  self.decide_draw = function()
  {
    self.player_draw(engine.players[0]);
    if (engine.players.length == 2)
    {
      self.player_draw(engine.players[1]);
    }
  };
  self.player_draw = function(var player)
  {
    if (player.current.draw == true)
    {
      self.drawShape.create_blocks(player.current.get_list(),player.current.x,player.current.y,player.current.shape.color);
      text("Current: ",250,135);
      self.drawShape.create_blocks(player.current.get_list(),225,100,player.current.shape.color);
    }
    text("Next: ", 250,250);
    if (player.future.draw == true)
    {
      self.drawShape.create_blocks(player.future.get_list(),225,210,player.future.shape.color);
    }
    self.drawShape.draw_field(player.field.field);
  };
  self.ready = function()
  {
    if (engine.state == 0)
    {
      rect(350,290,100,100);
      text("Press Enter When You're Ready",400,300);
    }
  };
  self.instruct = function()
  {
    text("Instruction: ",50,450);
  };
  self.score = function()
  {
    text("Score", 350,18);
    text("P1: " + engine.score,350,35);
  };
}

PFont font = loadFont("monospace");
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
  self.state = 0;
  self.find_player = function(var id)
  { 
    for (var i = 0;i < self.players.length;i++)
    {
      if (self.players[i].id == id)
      {
	return self.players[i];
      }
    }
  };
  self.write_shape = function(var id,var name,var choice,var type)
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
  self.move = function(var x,var y)
  {
    var player = self.find_player(self.you);
    player.current.move(x,y);
    var offset = player.field.calculate_positions(player.current.x,player.current.y);
    if (player.field.check(player.current.get_list(),offset[0],offset[1]) == false)
    {
      player.current.move(-x,-y);
    }
  };
  self.rotate = function(var id, var choice)
  {
    var player = self.find_player(id);
    player.current.rotate(choice);
  };
  self.line_action = function(id,line)
  {
    var player = self.find_player(id);
    player.field.move_lines(player.field.clear_line(line));
  };
  self.stop = function(id)
  {
    self.destroy(id);
    console.log("Game over");
    self.mode.change(1);
  };
  self.destroy = function(id)
  {
    for (var i = 0; i < self.players.length; i++)
    {
      if (self.players[i].id == id)
      {
	self.players.splice(i,1);
	break;
      }
    }
  };
  self.create = function(var id)
  {
    var new_player = new Player();
    new_player.start();
    new_player.id = id;
    self.players.push(new_player);
  };
  self.high_score = function()
  {
    console.log("High score, detected!");
    self.mode.change(3);
  };
  self.start = function(var id)
  {
    self.create(id);
    self.you = id;
  };
  self.get_player = function(n)
  {
    return self.players[n];
  };
  self.key = function()
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
    case 10:
      if (self.state == 0)
      {
	game_protocol.confirm();
      }
      break;
    default:
      console.log(key);
      break;
    }
  };
};



//Workaround for HTTP connections being droped after two minutes. Tried many settings to keep the connection alive to no avail. However, constant sending every minute does seem to keep the connection alive. This bug may not affect machines outside of the original developer's.





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
  case 7:
    waiting.display();
    break;
  case 8:
    list.display();
    break;
  }
}

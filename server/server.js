var sys = require('sys');
var ws = require('../vendor/ws/ws');
var game = require('./protocols/game_protocol')
var player = require('./models/player')
var lobby = require('./protocol/lobby_protocol')

//server stuff
var db = require('./models/database');
//start of actual server code.
var server = ws.createServer();
var players = new Array();
server.listen(7000);

function find_id(id)
{
  for (var i = 0;i < players.length;i++)
  {
    if (player[i].id == id)
    {
      return i;
    }
  }
}

function send_score()
{
  data = [0,db.getDoc()];
  server.broadcast(JSON.stringify(data));
}

server.addListener("listening",function(){
  sys.log("Listening for connection.");
  db.readDoc(function() {
    sys.log("Read successful.");
  });
});

server.addListener("connection",function(conn){
  sys.log("<"+conn._id+"> connected");
  players.push(player.get_player(conn._id));
  send_score();
  server.send(conn._id,JSON.stringify([4])); //acknowledgement protocol.
  conn.addListener("close",function(){
    db.save();
    game.destroy(conn._id);
    sys.log("<"+conn._id+"> onClose");
  });
  
  conn.addListener("message",function(event){
    //data[0] notates data types so we know how to process the data.
    //0 - Score
    //1 - Lobby
    //2 - Game
    //3 - End Game
    data = JSON.parse(event);
    switch(data[0])
    {
    case 0:
      db.add_to_list(data[1],game.get_score(conn._id));
      game.destroy(conn._id);
      send_score();
      db.save();
      break;
    case 1:
      var stuff = lobby.process(data,players[find_by(conn._id)]);
      server.broadcast(stuff);
      break;
    case 2:
      game.process(data,conn._id);
      break;
    case 3:
      game.destroy(conn._id);
      break;
    }
  });

  conn.addListener("error",function(event){
    sys.log(event);
  });

  setInterval(function() {
    for (var i = 0; i < players.length; i++)
    {
      events = game.get_data(players[i].id);
      if (events != false)
      {
	if (events.length != 0)
	{
	  for (var a = 0;a < events.length;a++)
	  {
	    var message = JSON.stringify(events[a]);
	    server.send(players[i].id,message);
	  }
	}
      }
    }
  }, 10);
});
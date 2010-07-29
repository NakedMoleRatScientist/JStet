var sys = require('sys');
var ws = require('../vendor/ws/ws');
var game = require('./protocols/game_protocol');
var players = require('./models/players_manager');
var lobby = require('./protocols/lobby_protocol');

//server stuff
var db = require('./models/database');
//start of actual server code.
var server = ws.createServer();
var players = new Array();
server.listen(7000);

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
  players.create(conn._id));
  send_score();
  server.send(conn._id,JSON.stringify([4])); //acknowledgement protocol.
  conn.addListener("close",function(){
    db.save();
    players.destroy(conn._id);
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
    //Score data processing.
    case 0:
      db.add_to_list(data[1],game.get_score(conn._id));
      send_score();
      db.save();
      break;
    //Deal with lobby functions.
    case 1:
      var response = lobby.process(data,conn._id);
      if (response != -1)
      {
	server.broadcast(response);
      }
      break;
    //Deal with game functions.
    case 2:
      game.process(data,conn._id);
      break;
    //Destroy game.
    case 3:
      game.destroy(conn._id);
      break;
    }
  });

  conn.addListener("error",function(event){
    sys.log(event);
  });

  setInterval(function() {
    var all_players = players.get();
    for (var i = 0; i < all_players.length; i++)
    {
      events = game.get_data(all_players[i].id);
      if (events != false)
      {
	if (events.length != 0)
	{
	  for (var a = 0;a < events.length;a++)
	  {
	    var message = JSON.stringify(events[a]);
	    server.send(all_players[i].id,message);
	  }
	}
      }
    }
  }, 10);
});
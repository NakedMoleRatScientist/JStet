var sys = require('sys');
var ws = require('../vendor/ws/ws');
var game = require('./protocols/game_protocol')


//server stuff
var db = require('./models/database')
//start of actual server code.
var server = ws.createServer();
var players = new Array();
server.listen(7000);

function destroy(id)
{
  for (var i = 0;i < players.length;i++)
  {
    if (players[i] == id)
    {
      players.splice(i,1);
    }
  }
  game.destroy(id);
}

function sendData()
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
  players.push(conn._id);
  sendData();
  conn.addListener("close",function(){
    db.save();
    game.destroy(conn._id);
    sys.log("<"+conn._id+"> onClose");
  });
  
  conn.addListener("message",function(event){
    //data[0] notates data types so we know how to process the data.
    //0 - Score
    //1 - Client status
    //2 - Game
    data = JSON.parse(event);
    switch(data[0])
    {
    case 0:
      db.add_to_list(data[1],data[2]);
      sendData();
      db.save();
      break;
    case 2:
      game.process(data,conn._id);
      break;
    }
  });

  conn.addListener("error",function(event){
    sys.log(event);
  });

  setInterval(function() {
    for (var i = 0; i < players.length; i++)
    {
      events = game.get_data(players[i]);
      if (events != false)
      {
	if (events.length != 0)
	{
	  message = JSON.stringify(events[0]);
	  server.send(players[i],message);
	}
      }
    }
  }, 10);
});
var sys = require('sys');
var ws = require('../vendor/ws/ws');



//server stuff
var db = require('./models/database')
//start of actual server code.
var server = ws.createServer();
server.listen(7000);

server.addListener("listening",function(){
  sys.log("Listening for connection.");
  db.readDoc(function() {
    sys.log("Read successful.");
  });
});

server.addListener("connection",function(conn){
  sys.log("<"+conn._id+"> connected");
  server.broadcast(JSON.stringify(db.getDoc()));
  

  conn.addListener("close",function(){
    sys.log("<"+conn._id+"> onClose");
  });
  
  conn.addListener("message",function(event){
    sys.log(event.data);
  });
});



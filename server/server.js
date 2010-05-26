var sys = require('sys');
var ws = require('./lib/ws');

var server = ws.createServer();
server.listen(7000);

server.addListener("listening",function(){
  console.log("Listening for connection.");
});

server.addListener("connection",function(conn){
  sys.log("<"+conn._id+"> connected");
  server.broadcast("<"+conn._id+"> connected");

  conn.addListener("message",function(message){
    sys.log("<"+conn._id+"> "+message);
    server.broadcast("<"+conn._id+"> "+message);
  });

  conn.addListern("close",function(){
    sys.log("<"+conn._id+"> onClose");
    server.broadcast("<"+conn._id+"> disconnected");
  });
});
var sys = require('sys');
var ws = require('../vendor/ws/ws');



//server stuff
var db = require('./models/database')
//start of actual server code.
var server = ws.createServer();
server.listen(7000);

function sendData()
{
  server.broadcast(JSON.stringify(db.getDoc()));
}

server.addListener("listening",function(){
  sys.log("Listening for connection.");
  db.readDoc(function() {
    sys.log("Read successful.");
  });
});

server.addListener("connection",function(conn){
  sys.log("<"+conn._id+"> connected");
  sendData();
  conn.addListener("close",function(){
    db.save();
    sys.log("<"+conn._id+"> onClose");
  });
  
  conn.addListener("message",function(event){
    //data[0] notates data types so we know how to process the data. 
    data = JSON.parse(event);
    if (data[0] == 0)
    {
      db.add_to_list(data[1],data[2]);
      sendData();
      db.save();
    }
    else if(data[0] == 1)
    {
      sys.log("<"+conn._id+"> is still alive!");
    }
  });

  conn.addListener("error",function(event){
    sys.log(event);
  });
});



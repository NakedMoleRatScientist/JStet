var net = require('net');
var server = net.createServer(function (socket) {
  socket.addListener("connect", function () {
    console.log("wwwwwaah!");
  });
});

server.listen(7000,"localhost");
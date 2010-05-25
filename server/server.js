var tcp = require('tcp');
var server = tcp.createServer(function (socket) {
  socket.addListener("connect", function () {
    console.log("wwwwwaah!");
  });
});

server.listen(7000,"localhost");
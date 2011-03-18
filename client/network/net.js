

function Net()
{
  var self = this;
  self.ws = null;
  self.game = null;
  self.score = null;
  self.lobby = null;
  self.list = null;
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
      case 5:
	self.list.process_data(data[1]);
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

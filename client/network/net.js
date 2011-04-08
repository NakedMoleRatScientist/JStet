

function Net()
{
  var self = this;
  self.ws = null;
  self.initialize = function()
  {
    self.ws = new WebSocket('ws://jstet.kibabase.com:7000');
    self.ws.onmessage = function(event)
    {
      var data = JSON.parse(event.data);
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
        score_protocol.change_data(data[1]);
	break;
      case 1:
	lobby_protocol.process_data(data[1]);
	break;
      case 2:
	game_protocol.process_data(data[1]);
	break;
      case 4:
	console.log("Acknowledged.");
	title.connected = true;
	break;
      case 5:
	list_protocol.process_data(data[1]);
	break;
      case 6:
	join_protocol.process_data(data[1]);
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

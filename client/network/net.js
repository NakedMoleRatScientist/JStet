

function Net()
{
  var self = this;
  self.ws = null;
  self.game = null;
  self.initialize = function()
  {
    self.ws = new WebSocket('ws://localhost:7000');
    self.ws.onmessage = function(event)
    {
      data = JSON.parse(event.data);
      
      switch (data[0])
      {
      case 0:
        self.score.protocol.changeData(data[1]);
	break;
      case 2:
	self.game.processData(data[1]);
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
  self.transmitScore = function()
  {
    self.ws.send(self.score.protocol.toJSON());
  };
  self.send = function(data)
  {
    data = JSON.stringify(data);
    self.ws.send(data);
  };
}

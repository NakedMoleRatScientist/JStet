

function Net(score)
{
  var self = this;
  self.ws = null;
  self.score = score;
  self.initialize = function()
  {
    self.ws = new WebSocket('ws://localhost:7000');
    self.ws.onmessage = function(event)
    {
      self.data = JSON.parse(event.data);
      switch (self.data[0])
      {
      case 0:
        self.score.protocol.changeData(self.data[1]);
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
    data = JSON.stringify(message);
    self.ws.send(data);
  };
  self.transmitScore = function()
  {
    self.ws.send(self.score.protocol.toJSON());
  };
  self.send = function(data)
  {
    self.ws.send(data);
  };
}



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
        console.log("Excellent!");
      }
    };
    self.ws.onclose = function()
    {
      console.log("Connection ended.");
      console.log(timer.getSeconds() + " seconds has eclipsed");
    };
  };
  self.sendScore = function()
  {
    var message = {
      type = 0,
      name = identifer,
      points = self.score.points
    };
    data = JSON.stringify(message);
    self.ws.send(data);
  };
}

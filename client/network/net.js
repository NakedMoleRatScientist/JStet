

function Network()
{
  self = this;
  self.ws = null;
  self.initialize = function()
  {
    self.ws = new WebSocket('ws://localhost:7000');
    self.ws.onmessage = function(event)
    {
      self.data = JSON.parse(event.data);
    }
  };
}

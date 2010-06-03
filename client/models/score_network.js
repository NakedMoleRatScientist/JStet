

function ScoreNetwork()
{
  this.ws = null;
  this.initialize = function(){
    this.ws = new WebSocket('ws://localhost:7000');
    ws.onmessage = function(event)
    {
      data = JSON.parse(event.data);
    }
    ws.onclose = function()
    {
      console.log("Welcome to our world");
    }
  }
}


function ScoreNetwork()
{
  this.ws = null;
  this.data = null;
  this.initialize = function(){
    this.ws = new WebSocket('ws://localhost:7000');
    this.ws.onmessage = function(event)
    {
      this.data = JSON.parse(event.data);
    }
    this.ws.onclose = function()
    {
      console.log("Welcome to our world");
    }
  }
}


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
  //Return the mininum score to submit score to database.
  this.getLimit = function (){
    if (this.data.status == true)
    {
      return this.data.scores[99];
    }
    return false;
  }
}


function ScoreNetwork(score)
{
  this.ws = null;
  this.data = null;
  this.score = score;
  this.initialize = function(){
    this.ws = new WebSocket('ws://localhost:7000');
    this.ws.onmessage = function(event)
    {
      this.data = JSON.parse(event.data);
      this.score.changeMinimum(this.getLimit());
    }
    this.ws.onclose = function()
    {
      console.log("Welcome to our world");
    }
  }
  //Return the mininum score to submit score to database.
  this.getLimit = function(){
    if (this.data.status == true)
    {
      return this.data.scores[99];
    }
    return false;
  }
  this.transmitScore = function(){
    var data = {
      name: "kiba",
      points: this.score.points
    }
    this.ws.send(JSON.parse(data))
  }
}


function ScoreProtocol(score)
{
  var self = this;
  self.score = score;
  self.data = null;
  self.getData = function(data)
  {
    self.data = data;
    self.score.changeMinimum(self.getLimit());
  };
  self.getLimit = function()
  {
    if (self.data.status == true)
    {
      return self.data.scores[99];
    }
    return false;
  };
  self.transmitScore = function(identifer)
  {
    var message = [0,identifer,points];
    data = JSON.stringify(message);
    self.ws.send(data);
  };
}

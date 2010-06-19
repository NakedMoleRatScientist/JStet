

function ScoreProtocol(score,net)
{
  var self = this;
  self.score = score;
  self.data = null;
  self.net = net;
  self.changeData = function(data)
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
  self.toJSON = function(identifer)
  {
    var message = [0,identifer,self.score.points];
    data = JSON.stringify(message);
    return data
  };
  self.getData = function()
  {
    return self.data;
  };
}

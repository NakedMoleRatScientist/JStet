

function ScoreProtocol(net)
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
  self.getData = function()
  {
    return self.data;
  };
}

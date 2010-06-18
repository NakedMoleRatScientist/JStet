

function ScoreProtocol(score)
{
  var self = this;
  self.score = score;
  self.getData = function(data)
  {
    self.data = data;
    self.score.changeMinimum(self.getLimit());
  };
}

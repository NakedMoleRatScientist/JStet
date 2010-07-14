

function ScoreProtocol(net)
{
  var self = this;
  self.score = score;
  self.data = null;
  self.net = net;
  self.changeData = function(data)
  {
    self.data = data;
  };
  self.getData = function()
  {
    return self.data;
  };
}

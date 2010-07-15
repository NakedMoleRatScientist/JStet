

function ScoreProtocol(net)
{
  var self = this;
  self.data = null;
  self.net = net;
  self.net.score = self;
  self.changeData = function(data)
  {
    self.data = data;
  };
  self.getData = function()
  {
    return self.data;
  };
}

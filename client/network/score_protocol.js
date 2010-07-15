

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
  self.transmit_score = function(name,points)
  {
    //0 indicating score
    var message = [0,name,points];
    self.net.transmit(message);
  };
}

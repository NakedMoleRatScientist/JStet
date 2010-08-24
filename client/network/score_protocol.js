

function ScoreProtocol(net)
{
  var self = this;
  self.data = null;
  self.net = net;
  self.net.score = self;
  self.change_data = function(data)
  {
    self.data = data;
  };
  self.get_data = function()
  {
    return self.data;
  };
  self.transmit_score = function(name,points)
  {
    //0 indicating score
    var message = [0,name];
    self.net.send(message);
  };
}

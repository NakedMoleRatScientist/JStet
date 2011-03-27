

function ScoreProtocol()
{
  var self = this;
  self.data = null;
  self.change_data = function(data)
  {
    self.data = data;
  };
  self.get_data = function()
  {
    return self.data;
  };
  self.transmit_score = function(var name, var points)
  {
    //0 indicating score
    var message = [0,name];
    net.send(message);
  };
}

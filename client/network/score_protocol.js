

function ScoreProtocol()
{
  var self = this;
  self.data = null;
  self.change_data = function(var data)
  {
    self.data = data;
  };
  self.get_data = function()
  {
    return self.data;
  };
  self.request_score = function(var name)
  {
    //0 indicating request for score
    var message = [0,name];
    net.send(message);
  };
}

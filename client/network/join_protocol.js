
function JoinProtocol(var net)
{
  var self = this;
  self.net = net;
  self.request_join = function(var name,var pass)
  {
    var data [5,name,pass];
    self.net.send(data);
  };
}

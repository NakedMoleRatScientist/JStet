
function ListProtocol(var net)
{
  var self = this;
  self.net = net;
  self.request_list = function()
  {
    var data = [4,0];
    self.net.send(data);
  };
}

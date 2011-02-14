
function ListProtocol(var net)
{
  var self = this;
  self.net = net;
  self.net.list = self;
  self.request_list = function()
  {
    var data = [4,0];
    self.net.send(data);
  };
  self.process_data = function(var data)
  {
    switch(data[1])
    {
    case 0:
      
    }
  };
}

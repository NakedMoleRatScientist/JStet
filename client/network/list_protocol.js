
function ListProtocol(var net)
{
  var self = this;
  self.net = net;
  self.net.list = self;
  self.games = 0;
  self.names = [];
  self.request_size = function()
  {
    var data = [4,0];
    self.net.send(data);
  };
  self.request_names = function()
  {
    var data = [4,1];
    self.net.send(data);
  };
  self.process_data = function(var data)
  {
    switch(data[0])
    {
    case 0:
      {
	self.games = data[1];
      }
    case 1:
      {
	self.names = data[1];
      }
    }
  };
}

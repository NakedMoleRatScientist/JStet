
function SearchProtocol(var net)
{
  var self = this;
  self.net = net;
  self.process_data = function(var data)
  {
    switch(data[1])
    {
    case 0:
      console.log("Search initialized.");
    }
  };
  self.request_search = function()
  {
    var data = [3,0];
    self.net.send(data);
  };
}

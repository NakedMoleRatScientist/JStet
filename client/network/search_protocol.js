
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
}

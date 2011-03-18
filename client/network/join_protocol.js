
function JoinProtocol(var net)
{
  var self = this;
  self.net = net;
  self.request_join = function(var name,var pass)
  {
    var data [5,name,pass];
    self.net.send(data);
  };
  self.process_data = function(var data)
  {
    switch(data[0])
    {
    case 0:
      {
	console.log("success");
	break;
      }
    }
  };
}

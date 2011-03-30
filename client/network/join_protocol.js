
function JoinProtocol()
{
  var self = this;
  self.state = 0;
  self.request_join = function(var name,var pass)
  {
    var data = [5,0,name,pass];
    net.send(data);
  };
  self.process_data = function(var data)
  {
    switch(data[0])
    {
    case 0:
      {
	self.state = 1;
	break;
      }
    case 1:
      {
	engine.start(data[1]);
	engine.create(data[2]);
	mode.change(4);
	break;
      }
    }
  };
}

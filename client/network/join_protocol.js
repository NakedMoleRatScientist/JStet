
function JoinProtocol(var net)
{
  var self = this;
  self.net = net;
  self.net.join = self;
  self.state = 0;
  self.request_join = function(var name,var pass)
  {
    var data = [5,0,name,pass];
    self.net.send(data);
  };
  self.join_msg = function(var id,var player)
  {
    var data = [5,1,id,player];
    self.net.send(data);
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
	//send a join message to the other player
	self.join_msg(data[2]);
	break;
      }
    case 2:
      {
	engine.create(data[1]);
	mode.change(4);
	break;
      }
    }
  };
}

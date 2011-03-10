
function ListProtocol(var net)
{
  var self = this;
  self.net = net;
  self.net.list = self;
  self.games = 0;
  self.names = [];
  self.passwds = [];
  //Get size of games.
  self.request_size = function()
  {
    var data = [4,0];
    self.net.send(data);
  };
  //Get names of games.
  self.request_names = function()
  {
    var data = [4,1];
    self.net.send(data);
  };
  //learn which game have passwords and which don't
  self.request_passwds = function()
  {
    var data = [4,2];
    self.net.send(data);
  }
  //get a name by index.
  self.get_name = function(var n)
  {
    return self.names[n];
  };
  //which have passwords?
  self.request_password = function(var n)
  {
    var data = [4,2];
    self.net.send(data)
  };
  self.process_data = function(var data)
  {
    switch(data[0])
    {
    case 0:
      {
	//update game size.
	self.games = data[1];
	break;
      }
    case 1:
      {
	//update names.
	self.names = data[1];
	break;
      }
    case 2:
      {
	self.passwds = data[1];
	break;
      }
    }
  };
}

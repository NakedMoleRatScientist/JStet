
function ListProtocol(var net)
{
  var self = this;
  self.net = net;
  self.net.list = self;
  self.size = 0;
  self.games = [];
  //Get size of games.
  self.request_size = function()
  {
    var data = [4,0];
    self.net.send(data);
  };
  //Get games info.
  self.request_games = function()
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
	//update game size.
	self.size = data[1];
	break;
      }
    case 1:
      {
	//update games
	self.games.push(new GameInfo(data[1][0][1],data[1][0][0]));
	break;
      }
    }
  };
}

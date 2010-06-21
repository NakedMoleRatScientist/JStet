

function GameProtcol()
{
  var self = this;
  self.process = function(data)
  {
    switch(data)
    {
    case 0:
      sys.log("New game");
    }
  };
  
}

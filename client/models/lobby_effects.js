
function LobbyEffects()
{
  var self = this;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      switch(object.member)
	{
        case 0:
	    {
	      mreset();
	      game_protocol.request_game();
              break;
	    }
	case 1:
	    {
		mode.change(6);
		break;
	    }
	case 2:
	    {
		reset();
		list_protocol.request_size();
		list_protocol.request_games();
		mode.change(8);
		break;
	    }
	    case 3:
	    {
		mode.change(2);
		break;
	    }
	}
    }
  };
}

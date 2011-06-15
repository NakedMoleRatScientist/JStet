

function GameOverMode()
{
  var self = this;
  self.display = function()
  {
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,35);
    text("Game OVER",300,300);
    textFont(font,18);
    text("Press n to start a new game.",250,325);
    text("Press d to display highscore", 250,350);
    text("Press q to return to lobby mode",250,375);
  };
  self.key = function()
  {
      switch(key)
      {
	  case 110:
	  {
	      reset();
	      game_protocol.request_game();
	      break;
	  }
	  case 100:
	  {
	      mode.change(2);
	      break;
	  }
	  case 113:
	  {
	      mode.change(5);
	      break;
	  }
      }
	  
  }
}

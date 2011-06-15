

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
  };
  self.key = function()
  {
    if (key == 110)
    {
      game_protocol.request_delete();
      reset();
      game_protocol.request_game();
    }
    else if(key == 100)
    {
      mode.change(2);
    }
    else
    {
      console.log(key);
    }
  };
}

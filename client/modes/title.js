

function TitleMode()
{
  var self = this;
  self.connected = false;
  self.display = function()
  {
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,50);
    text("JStet",300,300);
    textFont(font,18);
    text("Press Enter to Connect.",260,325);
  };
  self.run = function()
  {
    titleKey();
  };
  self.switch_mode = function()
  {
    if (self.connected == true)
    {
      mode.change(5);
    }
  };
}

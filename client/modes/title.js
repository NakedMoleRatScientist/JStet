

function TitleMode()
{
  var self = this;
  self.connected = false;
  self.key = function()
  {
    switch(key)
    {
    case 10:
      title.connected = true;
      net.initialize();
      break;
    }
  };
  self.display = function()
  {
    background(0,0,0);
    PFont font = loadFont("monospace");
    textFont(font,50);
    text("JStet",300,300);
    textFont(font,18);
    text("Press Enter to Connect.",260,325);
  };
  self.switch_mode = function()
  {
    if (self.connected == true)
    {
      mode.change(5);
    }
  };
}

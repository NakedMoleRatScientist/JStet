
function PassEntryPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = true;
  self.effects = new PassEffects(self.pages);
  self.state = 0;
  self.initialize = function()
  {
  };
  self.call = function()
  {
    textFont(font,18);
    if (self.state == 0)
    {
      self.first_stage();
    }
    else
    {
      self.second_stage();
    }
    text(self.pages.input.string,150,300);
    
  };
  self.first_stage = function()
  {
    text("After you're done, press enter.",200,360);
    text("Please type your password for the other player.", 100, 250);
  };
  self.second_stage = function()
  {
    text("Please retype the password again. Press enter when you're done.",100,250);
  };
  self.act = function()
  {
    if (self.state == 0)
    {
      self.state = 1;
    }
    else
    {
      self.state = 0;
    }
  };
}

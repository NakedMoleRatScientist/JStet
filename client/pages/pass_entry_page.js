
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
    
    text(self.pages.input.string,150,300);
    
  };
  self.first_stage = function()
  {
    text("After you're done, press enter.",200,360);
    text("Please type your password for the other player.", 100, 250);
  };
}

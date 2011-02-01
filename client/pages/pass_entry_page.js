
function PassEntryPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = true;
  self.effect = new PassEffects(self.pages);
  self.initialize = function()
  {
  };
  self.call = function()
  {
    textFont(font,18);
    text("Please type your password for the other player.", 100, 250);
    text(self.pages.input.string,150,300);
    text("After you're done, press enter.",200,360);
  };
}

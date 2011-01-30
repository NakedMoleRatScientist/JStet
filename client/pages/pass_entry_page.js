
function PassEntryPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.password = new Input();
  };
  self.call = function()
  {
    text("Please type your password for the other player.", 100, 250);
  };
}


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
    text(self.password.string,150,300);
    var info = typing();
    switch(info)
    {
    case -13:
      console.log("turn page filler");
      break;
    }
  };
}

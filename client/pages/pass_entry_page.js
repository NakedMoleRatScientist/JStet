
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
    textFont(font,18);
    text("Please type your password for the other player.", 100, 250);
    text(self.password.string,150,300);
    text("After you're done, press enter.",200,360);
    var info = typing();
    switch(info)
    {
    case -13:
      console.log("turn page filler");
      break;
    }
  };
}



function PasswordPage(pages)
{
  var self = this;
  self.pages = pages;
  self.pages.initialize();
  self.call = function()
  {
    textFont(font,18);
    text("Since you choose two players...",0,18);
  };
}

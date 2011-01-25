

function PasswordPage(pages)
{
  var self = this;
  self.pages = pages;
  self.pages.initialize();
  self.call = function()
  {
    text("Since you choose two players...");
  };
}

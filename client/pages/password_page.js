

function PasswordPage(pages)
{
  var self = this;
  self.pages = pages;
  self.pages.initialize();
  self.yes = new RadioButton();
  self.no = new RadioButton();
  self.yes.set(20,50);
  self.no.set(70,50);
  self.radio_switch = new RadioSwitch();
  self.call = function()
  {
    textFont(font,18);
    text("Since you choose two players...",0,18);
    text("Do you wish to password-protect for someone?",0,36);
    self.yes.display();
    self.no.display();
  };
}

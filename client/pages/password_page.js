

function PasswordPage(pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.yes = new RadioButton();
    self.no = new RadioButton();
    self.yes.set(20,50);
    self.no.set(80,50);
    self.radio_switch = new RadioSwitch();
    self.radio_switch.add(self.yes);
    self.radio_switch.add(self.no);
    self.pages.collision.effects.add_effect(self.radio_switch);   
  };
  self.call = function()
  {
    textFont(font,18);
    text("Since you choose two players...",0,18);
    text("Do you wish to password-protect for someone?",0,36);
    self.yes.display();
    self.yes.text("Yes");
    self.no.text("No");
    self.no.display();
    self.pages.display();
  };
}


function PlayersPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.one = new RadioButton();
    self.one.set(20,40);
    self.two = new RadioButton();
    self.two.set(90,40);
    self.radio_switch = new RadioSwitch();
    self.radio_switch.add(self.one);
    self.radio_switch.add(self.two);
    self.pages.collision.effects.add_effect(self.radio_switch);
    self.pages.collision.effects.add_effect(new PlayersEffects(self.pages));    
  };
  self.call = function()
  {
    textFont(font,18);
    text("Single or two players?",0,18);
    self.one.display();
    self.one.text("One");
    self.two.display();
    self.two.text("Two");
    self.pages.display();
  };
  self.key = function()
  {
  };
}

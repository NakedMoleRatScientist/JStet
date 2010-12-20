
function PlayersPage(collision)
{
  var collision = collision;
  var self = this;
  self.radio_switch = new RadioSwitch();
  self.radio_switch.add(self.one);
  self.radio_switch.add(self.two);
  collision.effect.add_effect(self.radio_switch);
  self.call = function()
  {
    textFont(font,18);
    text("Single or two players?",0,18);
    self.one.display();
    self.one.text("One");
    self.two.display();
    self.two.text("Two");
  };
}

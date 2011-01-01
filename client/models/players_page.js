
function PlayersPage(collision)
{
  var collision = collision;
  var self = this;
  self.one = new RadioButton();
  self.one.set(20,40);
  self.two = new RadioButton();
  self.two.set(90,40);
  self.turn = new TextButton("turn",100,500,500);
  self.radio_switch = new RadioSwitch();
  self.radio_switch.add(self.one);
  self.radio_switch.add(self.two);
  collision.effect.add_effect(self.radio_switch);
  collision.add(self.turn);
  self.call = function()
  {
    textFont(font,18);
    text("Single or two players?",0,18);
    self.one.display();
    self.one.text("One");
    self.two.display();
    self.two.text("Two");
    self.turn.display();
  };
}


function CreateGameMode()
{
  var self = this;
  self.others = false;
  self.one = new RadioButton();
  self.one.set(20,40);
  self.two = new RadioButton();
  self.two.set(90,40);
  self.collision = new Collision();
  self.radio_switch = new RadioSwitch();
  self.radio_switch.add(self.one);
  self.radio_switch.add(self.two);
  self.collision.effect.add_effect(self.radio_switch);
  self.players = function()
  {
    textFont(font,18);
    text("Single or two players?",0,18);
    self.one.display();
    self.one.text("One");
    self.two.display();
    self.two.text("Two");

    text("Passphrase or not?",0,40);
  };
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    self.players();
  };
}

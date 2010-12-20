
function PlayersPage(collision)
{
  var collision = collision;
  var self = this;
  self.radio_switch = new RadioSwitch();
  self.radio_switch.add(self.one);
  self.radio_switch.add(self.two);
  collision.effect.add_effect(self.radio_switch);
}

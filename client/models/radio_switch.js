
function RadioSwitch()
{
  self.switches = [];
  self.add_switch = function(var button)
  {
    self.switches.push(button);
  };
  self.update = function(var n)
  {
    self.switches[n].state = true;
  };
}

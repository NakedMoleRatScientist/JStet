
function Effect(var effect)
{
  var self = effect;
  self.elements = [];
  self.counter = 0;
  self.add = function(var button)
  {
    button.member = self.counter;
    self.counter ++;
    self.elements.push(button);
  };
}


function Effect(var parent)
{
  var self = parent;
  self.elements = [];
  self.counter = 0;
  self.type == false;
  self.input = new Input();
  self.add_type();
  self.add = function(var button)
  {
    button.member = self.counter;
    self.counter ++;
    self.elements.push(button);
  };
  self.use = function(var collision)
  {
    self.collision = collision;
    for (var i = 0; i < self.elements.length; i++)
    {
      self.collision.add(self.elements[i]);
    }
  };
  self.check_type = function(var info)
  {
    if (self.type == true)
    {
      if (info == -8)
      {
	self.input.destroy();
      }
      else if (info == -10)
      {
	self.type_enter();
      }
      else
      {
	self.input.addLetter(info);
      }
    }
  };
  self.type_enter = function()
  {
    console.log('ddd');
    self.collision.effects.check(self.input);
  };
  self.add_type = function()
  {
    self.add(self.input);
  };
}

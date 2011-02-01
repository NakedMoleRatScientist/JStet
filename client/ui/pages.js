

function Pages()
{
  var self = this;
  self.collision = new Collision();
  self.pages = [];
  self.on = 0;
  self.turn = new TextButton("turn",100,500,500);
  self.turn.rect.type = 3;
  self.effect = new PageEffect(self);
  self.effect.add(self.turn.rect);
  self.data = new DataCollect();
  self.input = new Input();
  self.forward = function ()
  {
    self.on ++;
    if (self.on > self.pages.length - 1)
    {
      self.on --;
    }
  }
  self.backward = function ()
  {
    self.on --;
    if (self.on < 0)
    {
      self.on ++;
    }
  }
  self.display = function()
  {
    self.turn.display();
  };
  self.run = function()
  {
    self.pages[self.on].call();
  };
  self.add = function(var object)
  {
    self.pages.push(object);
  };
  self.type_check = function(var info)
  {
    if (self.pages[self.on].typing == true)
    {
      if (info == -8)
      {
	self.input.destroy();
      }
      else
      {
	self.input.addLetter(info);
      }
    }
  };
  self.type_enter = function()
  {
    self.pages[self.on].act(); 
  };
  self.initialize = function()
  {
    self.collision.effects.add_effect(self.effect);
    self.pages[self.on].initialize();
  };
}

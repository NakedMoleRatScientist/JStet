
function SubmitEffects(var pages,radio)
{
  var self = this;
  self.pages = pages;
  self.radio = radio;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      if (self.radio.which_key == -1)
      {
	self.pages.act();
      }
      else if (self.radio.which_key == 0)
      {
	self.pages.collision.send(new TurnEvent());
      }
    }
  };
}

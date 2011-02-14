
function ListEffects()
{
  var self = this;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      console.log('success');
    }
  };
}


function CollisionEffect(var collision)
{
  self = this;
  self.collision = collision;
  self.effects = [];
  self.add_effect = function(var object)
  {
    object.use(self.collision);
    self.effects.push(object);
  }
}

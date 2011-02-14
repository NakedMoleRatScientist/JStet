
function ListEffects(var mode)
{
  var self = this;
  self.mode = mode;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      list.request_list();
    }
  };
}

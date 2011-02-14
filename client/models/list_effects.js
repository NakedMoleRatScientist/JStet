
function ListEffects(var list)
{
  var self = this;
  self.list = list;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      list.request_list();
    }
  };
}

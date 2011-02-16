
function ListEffects(var page)
{
  var self = this;
  self.page = page;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    if (object.type == 0)
    {
      list_protocol.request_size();
    }
  };
}

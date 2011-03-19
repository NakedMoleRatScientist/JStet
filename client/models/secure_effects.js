
function SecureEffects(var pages, var secure)
{
  var self = this;
  self.pages = pages;
  self.secure = secure;
  self.effect = new Effect(self);
  self.check = function(object)
  {
    if (object.type == 2)
    {
      join_protocol.request_join(self.pages.data.get("name"),self.input.string);
    }
  };
}

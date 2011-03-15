
function activeType(var parent)
{
  var self = parent;
  if (self.type == true)
  {
    var info = typing();
    self.check_type(info);
  }
}

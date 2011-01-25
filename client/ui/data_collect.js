
function DataCollect()
{
  var self = this;
  self.data = [];
  self.create = function(name)
  {
    self.data.push(new Info());
  };
}

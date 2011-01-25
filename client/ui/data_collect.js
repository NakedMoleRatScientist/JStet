
function DataCollect()
{
  var self = this;
  self.data = [];
  self.create = function(var name)
  {
    self.data.push(new Info(name));
  };
  self.find = function(var name)
  {
    for (var i = 0; i < self.data.size; i++)
    {
      if (self.data[i].name == name)
      {
	return i;
      }
    }
  };
  self.insert = function(var i, var info)
  {
    self.data[i].value = info;
  };
}

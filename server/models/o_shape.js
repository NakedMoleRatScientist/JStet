
function OShape()
{
  var self = this;
  self.name = "o";
  self.length = 1;
  self.color = 50;
  self.get_data = function(choice)
  {
    var list = new Array();
    list.push([0,0]);
    list.push([1,0]);
    list.push([0,1]);
    list.push([1,1]);
    return list;
  }
}


exports.get = function()
{
  return new OShape();
}
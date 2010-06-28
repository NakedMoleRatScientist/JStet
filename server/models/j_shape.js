
function JShape()
{
  var self = this;
  self.name = "j";
  self.length = 4;
  self.get_data = function(choice)
  {
    var list = new Array();
    switch(choice)
    {
    case 0:
      {
        list.push([1,0]);
        list.push([1,1]);
        list.push([1,2]);
        list.push([0,2]);
        break;
      }
    case 1:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([2,0]);
        list.push([2,1]);
        break;
      }
    case 2:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([0,1]);
        list.push([0,2]);
        break;
      }
    case 3:
      {
        list.push([0,0]);
        list.push([0,1]);
        list.push([1,1]);
        list.push([2,1]);
        break;
      }
    }
    return list;
  }
}

exports.get = function()
{
  return new JShape();
}
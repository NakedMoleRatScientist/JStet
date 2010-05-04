
function ShapeGenerator ()
{
  this.randomChoice = function ()
  {
    return Math.random() * 6;
  }
  this.getShape = function()
  {
    var list = new Array();
    var choice = this.randomChoice();
    switch(choice)
    {
    case 1:
      {
        list.add([0,0]);
        list.add([0,1]);
        list.add([0,2]);
        list.add([1,2]);
        break;
      }
    case 2:
      {
        list.add([0,0]);
        list.add([0,1]);
        list.add([0,2]);
        list.add([0,3]);
        break;
      }
    case 3:
      {
        list.add([0,0]);
        list.add([1,0]);
        list.add([2,0]);
        list.add([1,1]);
      }
    }
  }
}
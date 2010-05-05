
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
    console.log(choice);
    switch(choice)
    {
    case 0:
      {
        list.push([0,0]);
        list.push([0,1]);
        list.push([0,2]);
        list.push([1,2]);
        break;
      }
    case 1:
      {
        list.push([0,0]);
        list.push([0,1]);
        list.push([0,2]);
        list.push([0,3]);
        break;
      }
    case 2:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([2,0]);
        list.push([1,1]);
      }
    case 3:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([0,1]);
        list.push([1,1]);
        break;
      }
    case 4:
      {
        list.push([1,0]);
        list.push([2,0]);
        list.push([1,1]);
        list.push([0,1]);
        break;
      }
    case 5:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([1,1]);
        list.push([2,1]);
        break;
      }
    case 6:
      {
        list.push([1,0]);
        list.push([1,1]);
        list.push([1,2]);
        list.push([0,3]);
        break;
      }
    }
    return list;
  }
  this.current = this.getShape();
}



function randomChoice()
{
  return Math.floor(Math.random() * 7);
}


exports.getShape = function()
{
  var choice = randomChoice();
  switch(choice)
  {
  case 0:
    return new LShape();
  case 1:
    return new SShape();
  case 2:
    return new OShape();
  case 3:
    return new ZShape();
  case 4:
    return new TShape();
  case 5:
    return new JShape();
  case 6:
    return new IShape();
  }
}

function getShape ()
{
  var choice = this.randomChoice();
  switch(choice)
  {
  case "l":
    {
      return new LShape();
    }
  case "s":
    {
      return new SShape();
    }
  case "o":
    {
      return new OShape();
    }
  case "z":
   {
      return new ZShape();
    }
  case "t":
    {
      return new TShape();
    }
  case "j":
    {
       return new JShape();
    }
  case "i":
    {
      return new IShape();
    }
  }
}

function listKey(var list)
{
  frameRate(20);
  if (keyPressed)
  {
    switch(key)
    {
      //arrow key up
    case "w":
      {
	list.pointer -= 1;
	break;
      }
    case "s":
      {
	list.pointer += 1;
	break;
      }
    }
  }
}


function listKey(var list,var size)
{
  frameRate(10);
  if (keyPressed)
  {
    switch(key)
    {
      //arrow key up
    case 119:
      {
	if (list.pointer > 0)
	{
	  list.pointer -= 1;
	}
	break;
      }
    case 115:
      {
	if (list.pointer < size)
	{
	  list.pointer += 1;
	}
	break;
      }
    case 13:
      {
	list.enter();
	break;
      }
    }
  }
}

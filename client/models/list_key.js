
function listKey(var list)
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
	list.pointer += 1;
	break;
      }
    }
  }
}

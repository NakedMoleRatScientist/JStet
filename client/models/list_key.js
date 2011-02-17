
function listKey(var list)
{
  frameRate(20);
  if (keyPressed)
  {
    switch(key)
    {
      //arrow key up
    case 119:
      {
	list.pointer -= 1;
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

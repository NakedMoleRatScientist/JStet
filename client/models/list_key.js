
function listKey(var list)
{
  frameRate(20);
  if (keyPressed)
  {
    switch(key)
    {
      //arrow key up
    case 65535:
      {
	list.pointer += 1;
	break;
      }
    }
  }
}



//Use the ASCII chart to figure out what keys respond to what integer


void gameKey()
{
  switch(key)
  {
  //move right, d
  case 100:
    shape.move(20,0);
    checkEvent(-20,0);
    break;
  //move down, s
  case 115:
    shape.move(0,20);
    downEvent();
    break;
  //move left, a
  case 97:
    shape.move(-20,0);
    checkEvent(20,0);
    break;
  //rotate, w
  case 119:
    shape.rotate();
    if (checkEvent(0,0))
    {
      shape.rotate_backward();
    }
    break;
  default:
    console.log(key);
    break;
  }
}
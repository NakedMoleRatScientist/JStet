

//Use the ASCII chart to figure out what keys respond to what integer

void keyPressed()
{
  if (mode.status == 0)
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
  else if (mode.status == 1)
  {
    if (key == 110)
    {
      field.field = field.create_field();
      mode.change(0);
      score.reset();
      timer.reset();
    }
    else if(key == 100)
    {
      mode.change(2);
    }
  }
}
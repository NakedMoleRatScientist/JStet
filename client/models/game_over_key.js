
void gameOverKey()
{
  if (mode.status == 1)
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

void scoreKey()
{
  switch(key)
  {
  case 110:
    mode.change(0);
    break;
  case 106:
    board.previousPage();
    break;
  case 107:
    board.turnPage();
    break;
  }
}
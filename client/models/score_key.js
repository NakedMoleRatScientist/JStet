
void scoreKey()
{
  switch(key)
  {
  //n is restart the game
  case 110:
    restartGame();
    break;
  //j, view previous page
  case 106:
    board.previousPage();
    break;
  //k, view next page
  case 107:
    board.turnPage();
    break;
  }
}
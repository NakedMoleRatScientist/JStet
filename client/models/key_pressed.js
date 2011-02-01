
void keyPressed()
{
  switch(mode.status)
  {
  case 0:
    titleKey();
    break;
  case 4:
    gameKey();
    break;
  case 1:
    gameOverKey();
    break;
  case 2:
    scoreKey();
    break;
  case 3:
    enterHighScoreKey();
    break;
  case 5:
    chatKey();
    break;
  case 6:
    createKey();
  }
}

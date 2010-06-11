
void keyPressed()
{
  switch(mode.status)
  {
  case 0:
    gameKey();
    break;
  case 1:
    gameOverKey();
    break;
  case 2:
    scoreKey();
    break;
  case 3:
    enterScoreKey();
    break;
  }
}

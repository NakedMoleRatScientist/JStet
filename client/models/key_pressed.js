
void keyPressed()
{
  switch(mode.status)
  {
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
  }
}


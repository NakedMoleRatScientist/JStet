
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
    enterScoreKey();
    break;
  case 5:
    lobbyKey();
    break;
  case 6:
    chat_key();
    break;
  }
}

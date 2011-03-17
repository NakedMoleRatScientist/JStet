void draw()
{
  timer.react();
  sendAlive();
  switch(mode.status)
  {
  case 0:
    title.display();
    title.switch_mode();
    break;
  case 4:
    engineDraw.display();
    break;
  case 1:
    over.display();
    gameOverKey();
    break;
  case 2:
    board.display();
    scoreKey();
    break;
  case 3:
    high_score.display();
    enterHighScoreKey();
    break;
  case 5:
    lobby.display();
    break;
  case 6:
    create.display();
    break;
  case 7:
    waiting.display();
    break;
  case 8:
    list.display();
    break;
  }
}

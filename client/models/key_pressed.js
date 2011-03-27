
void keyPressed()
{
  switch(mode.status)
  {
  case 0:
    title.key();
    break;
  case 4:
    engine.key();
    break;
  case 5:
    lobby.key();
    break;
  case 6:
    create.key();
    break;
  case 8:
    list.key();
    break;
  case 1:
    over.key();
    break;
  case 2:
    board.key();
    break;
  case 3:
    high_score.key();
    break;
  }
}



void keyPressed()
{
  switch(mode.status)
  {
  case 0:
    title.key();
  case 4:
    engine.key();
    break;
  case 5:
    lobby.key();
  case 1:
    over.key();
    break;
  case 2:
    scoreKey();
    break;
  case 3:
    high_score.key();
    break;
  }
}


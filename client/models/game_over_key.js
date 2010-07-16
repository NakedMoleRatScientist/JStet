
void gameOverKey()
{
  if (key == 110)
  {
    mode.change(4);
    game_protocol.requestGame();
  }
  else if(key == 100)
  {
    mode.change(2);
  }
}
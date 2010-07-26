
void gameOverKey()
{
  if (key == 110)
  {
    game_protocol.request_game();
  }
  else if(key == 100)
  {
    mode.change(2);
  }
}

void lobbyMouse()
{
  if (lobby.collision.check(mouseX,mouseY) == 0)
  {
    game_protocol.request_game();
  }
}
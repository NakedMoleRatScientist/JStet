
void lobbyMouse()
{
  if (lobby.collision.check(mouseX,mouseY))
  {
    game_protocol.request_game();
  }
}
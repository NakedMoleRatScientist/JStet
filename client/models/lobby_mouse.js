
void lobbyMouse()
{
  switch(lobby.collision.check(mouseX,mouseY))
  {
  case 0:
    {
      game_protocol.request_game();
    }
  }
}
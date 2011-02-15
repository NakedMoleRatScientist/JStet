
void mousePressed()
{
  switch(mode.status)
  {
  case 5:
    lobbyMouse();
    break;
  case 6:
    createMouse();
    break;
  case 8:
    listMouse();
    break;
  }
}



//Use the ASCII chart to figure out what keys respond to what integer


void gameKey()
{
  switch(key)
  {
  //move right, d
  case 100:
    game_protocol.moveRight();
    break;
  //move down, s
  case 115:
    game_protocol.moveDown();
    break;
  //move left, a
  case 97:
    game_protocol.moveLeft();
    break;
  //rotate, w
  case 119:
    game_protocol.rotate();
    break;
  default:
    console.log(key);
    break;
  }
}
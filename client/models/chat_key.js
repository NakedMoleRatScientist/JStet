
void chatKey()
{
  var info = typing();
  switch(info)
  {
  default:
    lobby.chat.message.addLetter(info);
    break;
  case -8:
    lobby.chat.message.destroy();
    break;
  case -10:
    lobby.chat.enter();
    break;
  case false:
    return;
    break;
  }
}

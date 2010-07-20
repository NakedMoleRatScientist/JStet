
void chatKey()
{
  var info = typing();
  switch(info)
  {
  default:
    lobby.chat.message.addLetter(info);
    break;
  }
}

void chat_key()
{
  var info = typing();
  switch(info)
  {
  default:
    lobby.chat.message.addLetter(info);
    break;
  }
}
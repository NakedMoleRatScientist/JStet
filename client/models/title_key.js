
void titleKey()
{
  switch(key)
  {
  case 13:
    title.connected = true;
    network.initialize();
    break;
  }
}
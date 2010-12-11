
void titleKey()
{
  switch(key)
  {
  case 10:
    title.connected = true;
    network.initialize();
    break;
  }
}

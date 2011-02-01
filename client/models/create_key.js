
void createKey()
{
  var info = typing();
  switch(info)
  {
  default:
    create.pages.type_check(info);
    break;
  case 10:
    create.pages.type_enter(info);
    break;
  }
}

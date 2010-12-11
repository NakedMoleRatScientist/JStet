
void createMouse()
{
  switch(create.collision.check_circles(mouseX,mouseY))
  {
  case 1:
    {
      console.log("beep");
    }
  }
}

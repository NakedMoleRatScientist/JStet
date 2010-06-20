
void restartGame()
{
  field.field = field.create_field();
  mode.change(4);
  score.reset();
  timer.reset();
}

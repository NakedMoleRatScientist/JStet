
void restartGame()
{
  field.field = field.create_field();
  mode.change(0);
  score.reset();
  timer.reset();
}

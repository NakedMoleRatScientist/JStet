
void enterScoreKey()
{
  var info = typing()
  switch(key)
  {
  case 8:
    score_data.destroy();
    break;
  case 13:
    score_protocol.transmit_score(score_data.getName(),engine.score);
    score_data.clean();
    mode.change(2);
    break;
  }
}
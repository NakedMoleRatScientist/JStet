
void enterHighScoreKey()
{
  var info = typing()
  switch (info)
  {
  case false:
    break;
  case -8:
    score_data.name.destroy();
    break;
  case -13:
    score_protocol.transmit_score(high_score.get_name(),engine.score);
    high_score.clean();
    mode.change(2);
    break;
  default:
    high_score.name.addLetter(info);
    break;
  }
}
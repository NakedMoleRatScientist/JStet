
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
    score_protocol.transmit_score(score_data.get_name(),engine.score);
    high_score.clean();
    mode.change(2);
    break;
  default:
    score_data.name.addLetter(info);
    break;
  }
}
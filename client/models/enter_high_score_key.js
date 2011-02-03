
void enterHighScoreKey()
{
  var info = typing();
  switch (info)
  {
  case false:
    break;
  case -8:
    high_score.name.destroy();
    break;
  case -10:
    score_protocol.transmit_score(high_score.get_name(),engine.score);
    high_score.name.clean();
    mode.change(2);
    break;
  default:
    high_score.name.addLetter(info);
    break;
  }
}

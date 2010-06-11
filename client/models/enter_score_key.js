
var score_data = HighScore();

void enterScoreKey()
{
  switch(key)
  {
  case 97:
    score_data.addLetter("a");
    break;
  }
}
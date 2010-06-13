
void enterScoreKey()
{
  switch(key)
  {
  case 97:
    score_data.addLetter("a");
    break;
  case 98:
    score_data.addLetter("b");
    break;
  case 99:
    score_data.addLetter("c");
    break;
  case 100:
    score_data.addLetter("d");
    break;
  case 101:
    score_data.addLetter("e");
    break;
  case 102:
    score_data.addLetter("f");
    break;
  case 103:
    score_data.addLetter("g");
    break;
  case 104:
    score_data.addLetter("h");
    break;
  case 105:
    score_data.addLetter("i");
    break;
  case 106:
    score_data.addLetter("j");
    break;
  case 107:
    score_data.addLetter("k");
    break;
  case 108:
    score_data.addLetter("l");
    break;
  case 109:
    score_data.addLetter("m");
    break;
  case 110:
    score_data.addLetter("n");
    break;
  case 111:
    score_data.addLetter("o");
    break;
  case 112:
    score_data.addLetter("p");
    break;
  case 113:
    score_data.addLetter("q");
    break;
  case 114:
    score_data.addLetter("r");
    break;
  case 115:
    score_data.addLetter("s");
    break;
  case 116:
    score_data.addLetter("t");
    break;
  case 117:
    score_data.addLetter("u");
    break;
  case 118:
    score_data.addLetter("v");
    break;
  case 119:
    score_data.addLetter("w");
    break;
  case 120:
    score_data.addLetter("x");
    break;
  case 121:
    score_data.addLetter("y");
    break;
  case 122:
    score_data.addLetter("z");
    break;
  //backspace
  case 8:
    score_data.destroy();
    break;
  case 13:
    score.network.transmitScore(score_data.getName());
    break;
  }
}
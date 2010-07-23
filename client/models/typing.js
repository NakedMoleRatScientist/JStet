
void typing()
{
  switch(key)
  {
  case 97:
    return("a");
    break;
  case 98:
    return("b");
    break;
  case 99:
    return("c");
    break;
  case 100:
    return("d");
    break;
  case 101:
    return("e");
    break;
  case 102:
    return("f");
    break;
  case 103:
    return("g");
    break;
  case 104:
    return("h");
    break;
  case 105:
    return("i");
    break;
  case 106:
    return("j");
    break;
  case 107:
    return("k");
    break;
  case 108:
    return("l");
    break;
  case 109:
    return("m");
    break;
  case 110:
    return("n");
    break;
  case 111:
    return("o");
    break;
  case 112:
    return("p");
    break;
  case 113:
    return("q");
    break;
  case 114:
    return("r");
    break;
  case 115:
    return("s");
    break;
  case 116:
    return("t");
    break;
  case 117:
    return("u");
    break;
  case 118:
    return("v");
    break;
  case 119:
    return("w");
    break;
  case 120:
    return("x");
    break;
  case 121:
    return("y");
    break;
  case 122:
    return("z");
    break;
  case 48:
    return("0");
    break;
  case 49:
    return("1");
    break;
  case 50:
    return("2");
    break;
  case 51:
    return("3");
    break;
  case 52:
    return("4");
    break;
  case 53:
    return("5");
    break;
  case 54:
    return("6");
    break;
  case 55:
    return("7");
    break;
  case 56:
    return("8");
    break;
  case 57:
    return("9");
    break;
  case 58:
    return(":");
    break;
  case 59:
    return(";");
    break;
  case 60:
    return("<");
    break;
  case 61;
    return("=");
    break;
  //backspace
  case 8:
    return -8;
    break;
  //enter
  case 13:
    return -13;
    break;
  default: return false;
  }
}

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
  case 32:
    return(" ");
    break;
  case 33:
    return("!");
    break;
  case 34:
    return("\"");
    break;
  case 35:
    return("#");
    break;
  case 36:
    return("$");
    break;
  case 37:
    return("%");
    break;
  case 38:
    return("&");
    break;
  case 39:
    return("'");
    break;
  case 40:
    return("(");
    break;
  case 41:
    return(")");
    break;
  case 42:
    return("*");
    break;
  case 44:
    return(",");
    break;
  case 46:
    return(".");
    break;
  case 47:
    return("/");
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
  case 64:
    return("@");
    break;
  case 91:
    return("[");
    break;
  case 92:
    return("\\");
    break;
  case 93:
    return("]");
    break;
  case 94:
    return("^");
    break;
  case 96:
    return("`");
    break;
  case 123:
    return ("{");
    break;
  case 125:
    return ("}");
    break;
  case 186:
    return(";");
    break;
  case 187:
    return("=");
    break;
  case 188:
    return ("<");
    break;
  case 189:
    return("-");
    break;
  case 190:
    return(">");
  case 191:
    return("?");
    break;
  case 192:
    return("~");
    break;
  //backspace
  case 8:
    return -8;
    break;
  //enter
  case 10:
    return -10;
    break;
  //shift, ctrl, etc
  case 65535:
    return false;
    break;
  default: return key;
  }
}

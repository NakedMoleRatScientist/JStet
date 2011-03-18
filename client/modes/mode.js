
function Mode()
{
  this.status = 0;
  this.change = function(n)
  {
    this.status = n;
  }
}

var mode = new Mode();
var timer = new TimerAction();
var high_score = new HighScoreMode();
var lobby = new LobbyMode();
var network = new Net();
var over = new GameOverMode();
var title = new TitleMode();
var waiting = new WaitingMode();
var list = new ListGameMode();
var create = new CreateGameMode();
var game_protocol = new GameProtocol(network);
var score_protocol = new ScoreProtocol(network);
var lobby_protocol = new LobbyProtocol(network,lobby);
var list_protocol = new ListProtocol(network);
var join_protocol = new JoinProtocol(network);
lobby.chat.protocol = lobby_protocol;
var board = new ScoreBoardMode(score_protocol);
timer.addAction("network",60);
var engine = new Engine(game_protocol,mode);
var engineDraw = new EngineDraw();

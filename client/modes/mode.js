
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
var net = new Net();
var over = new GameOverMode();
var title = new TitleMode();
var waiting = new WaitingMode();
var list = new ListGameMode();
var create = new CreateGameMode();
var game_protocol = new GameProtocol();
var score_protocol = new ScoreProtocol();
var lobby_protocol = new LobbyProtocol();
var list_protocol = new ListProtocol();
var join_protocol = new JoinProtocol();
lobby.chat.protocol = lobby_protocol;
var board = new ScoreBoardMode();
timer.addAction("network",60);
var engine = new Engine();
var engineDraw = new EngineDraw();


function Mode()
{
  var self = this;
  self.status = 0;
  self.change = function(n)
  {
    self.status = n;
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
var board = new ScoreBoardMode();
timer.addAction("network",60);
var engine = new Engine();
var engineDraw = new EngineDraw();

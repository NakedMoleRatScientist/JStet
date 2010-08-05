var tetro = require('../models/tetromino');
var field = require('../models/playfield');
function Player(id)
{
  var self = this;
  self.id = id;
  self.nick = id;

}

function PlayerGameMode(player)
{
  var self = this;
  self.player = player;
  self.current = tetro.get_tetromino();
  self.future = tetro.get_tetromino();
  self.field = field.get_field();
  self.over = false;
  self.score = 0;
}

exports.get_player = function(id)
{
  return new Player(id);
}

exports.get_game = function(player)
{
  return new PlayerGameMode(player);
}
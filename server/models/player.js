var tetro = require('../models/tetromino');
var field = require('../models/playfield');
var sys = require('sys');
function Player(id)
{
  var self = this;
  self.id = id;
  self.nick = id;
}

function PlayerGameMode(player,manager)
{
  var self = this;
  self.player = player;
  self.manager = manager;
  self.current = tetro.get_tetromino();
  self.future = tetro.get_tetromino();
  self.field = field.get_field();
  self.over = false;
  self.score = 0;
  self.cycle = function()
  {
    self.field.insert_blocks(self.current.get_list(),self.current.x,self.current.y);
    self.current.return_to_zero();
    self.current.change_shape(self.future.get_shape());
    self.future.change_shape(generator.getShape());
    var status = true;
    self.cycle_message();
    while(status)
    {
      var clean = self.field.clear_line(self.field.check_field());
      status = self.field.move_lines(clean);
      if (clean != false)
      {
	self.score += 1;
	self.create_field_message(clean);
      }
    }
    self.create_score_message();
  };
  self.move = function()
  {
    if (self.over == true)
    {
      if (self.check_score() == true)
      {
	self.create_success_message();
      }
      else
      {
	self.create_over_message();
      }
      return true;
    }
    return false;
  };
}

exports.get_player = function(id)
{
  return new Player(id);
}

exports.get_game = function(player,manager)
{
  return new PlayerGameMode(player,manager);
}
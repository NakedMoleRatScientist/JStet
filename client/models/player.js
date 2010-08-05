
function Player()
{
  var self = this;
  self.current = new Tetromino();
  self.future = new Tetromino();
  self.field = new PlayField();
}
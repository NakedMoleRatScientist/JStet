function EngineDraw()
{
  var self = this;
  self.instruction = new Instruction();
  self.drawField = new PlayFieldDraw();
  self.drawShape = new TetrominoDraw();
  self.display = function()
  {
    textFont(font,18);
    background(0,0,0);
    stroke(205,201,201);
    fill(0,0,0);
    self.ready();
    self.field_draw_mode();
    self.instruct();
    self.decide_draw();
    self.score();
  };
  self.player_one_field = function()
  {
    text("Player One",75,50);
    self.drawField.display();
  };
  self.player_two_field = function()
  {
    text("Player Two",75,450);
    self.drawField.display_offset(400);
  };
  self.field_draw_mode = function()
  {
    if (self.engine.players.length > 0)
    {
      self.player_one_field();
      if (engine.players.length == 2)
      {
	self.player_two_field();
      }
    }
  };
  self.decide_draw = function()
  {
    self.player_draw(engine.players[0]);
    if (engine.players.length == 2)
    {
      self.player_draw(engine.players[1]);
    }
  };
  self.player_draw = function(var player)
  {
    if (player.current.draw == true)
    {
      self.drawShape.create_blocks(player.current.get_list(),player.current.x,player.current.y,player.current.shape.color);
      text("Current: ",250,135);
      self.drawShape.create_blocks(player.current.get_list(),225,100,player.current.shape.color);
    }
    text("Next: ", 250,250);
    if (player.future.draw == true)
    {
      self.drawShape.create_blocks(player.future.get_list(),225,210,player.future.shape.color);
    }
    self.drawShape.draw_field(player.field.field);
  };
  self.ready = function()
  {
    if (engine.state == 0)
    {
      rect(350,290,100,100);
      text("Press Enter When You're Ready",400,300);
    }
  };
  self.instruct = function()
  {
    text("Instruction: ",50,450);
  };
  self.score = function()
  {
    text("Score", 350,18);
    text("P1: " + engine.score,350,35);
  };
}

function EngineDraw()
{
  var self = this;
  self.drawField = new PlayFieldDraw();
  self.drawShape = new TetrominoDraw();
  self.display = function()
  {
    textFont(font,18);
    background(0,0,0);
    self.ready();
    if (engine.state == 1)
    {
      self.field_draw_mode();
      self.decide_draw();
      self.instruct();
      self.score();
    }
  };
  self.player_field = function(var name,var offset)
  {   
    text("Player " + name,75 + offset,50);
    if (engine.over == 1)
    {
      text("Game over!",275 + offset, 200);
    }
    self.drawField.display(offset);
  };
  self.field_draw_mode = function()
  {
    fill(0,0,0);
    self.player_field("One",0);
    if (engine.players.length == 2)
    {
      self.player_field("Two",400);
    }
  };
  self.decide_draw = function()
  {
    self.player_draw(engine.players[0],0);
    if (engine.players.length == 2)
    {
      self.player_draw(engine.players[1],400);
    }
  };
  self.player_draw = function(var player, var offset)
  {
    if (player.current.draw == true)
    {
      self.drawShape.create_blocks(player.current.get_list(),player.current.x + offset,player.current.y,player.current.shape.color);
      text("Current: ",250 + offset,135);
      self.drawShape.create_blocks(player.current.get_list(),225 + offset,100,player.current.shape.color);
    }
    text("Next: ", 250 + offset,250);
    if (player.future.draw == true)
    {
      self.drawShape.create_blocks(player.future.get_list(),225 + offset,210,player.future.shape.color);
    }
    self.drawShape.draw_field(player.field.field,offset);
  };
  self.ready = function()
  {
    if (engine.ready == 0)
    {
      noFill();
      rect(260,280,318,25);
      text("Press Enter When You're Ready",260,300);
    }
    else if (engine.ready == 1)
    {
      rect(260,280,318,25);
      text("Ready to rumble!",260,300);
    }
  };
  self.instruct = function()
  {
    text("Instruction: ",50,460);
    text("a - left",50,480);
    text("s - down",50,500);
    text("d - right",50,520);
    text("w - rotate",50,540);
  };
  self.score = function()
  {
    text("Score", 350,18);
    text("P1: " + engine.score_one,350,35);
    if (engine.players.length == 2)
    {
      text("P2: " + engine.score_two,350,45);
    }
  };
}

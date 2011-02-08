function EngineDraw()
{
  var self = this;
  self.instruction = new Instruction();
  self.drawField = new PlayFieldDraw();
  self.drawShape = new TetrominoDraw();
  self.drawMode = 0;
  self.display = function()
  {
    textFont(font,18);
    background(0,0,0);
    stroke(205,201,201);
    fill(0,0,0);
    //player one...
    self.field_draw_mode();
    //player two
    text("Player Two",75,450);
    rect(self.drawField.x + 400,self.drawField.y,self.drawField.width,self.drawField.height); //playfield
    rect(self.drawField.x + 400 + self.drawField.width,self.drawField.y,100,self.drawField.height); //Info display field
    self.instruct();
    self.player_one();
    self.score();
  };
  self.one_player_field = function()
  {
    text("Player One",350,50);
    self.drawField.display();
  };
  self.two_players_field = function()
  {
    text("Player One",75,50);
    self.drawField.display();
  };
  self.field_draw_mode = function()
  {
  };
  self.player_one = function()
  {
    var one = engine.find_player(engine.you);
    if (one.current.draw == true)
    {
      self.drawShape.create_blocks(one.current.get_list(),one.current.x,one.current.y,one.current.shape.color);
      text("Current: ",250,135);
      self.drawShape.create_blocks(one.current.get_list(),225,100,one.current.shape.color);
    }
    text("Next: ", 250,250);
    if (one.future.draw == true)
    {
      self.drawShape.create_blocks(one.future.get_list(),225,210,one.future.shape.color);
    }
    self.drawShape.draw_field(one.field.field);
  };
  self.instruct = function()
  {
    text("Instruction: ",50,450);
  };
  self.score = function()
  {
    text("Score", 350,18);
    text("P1: " + engine.score,350,35);
    text("Player One",75,50);
  };
}

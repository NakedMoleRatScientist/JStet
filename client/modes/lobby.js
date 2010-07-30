
function LobbyMode()
{
  var self = this;
  self.chat = new Chat();
  self.play = new PlayButton();
  self.collision = new Collision();
  self.collision.push_rect(self.play.play)
  self.display = function()
  {
    background(0,0,0);
    self.chat.display();
    self.play.display();
    noFill();
    rect(0,580,800,20);
    rect(0,0,400,580);
  };
  self.switch_mode = function()
  {
    mode.change(4);
  };
}
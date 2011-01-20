
function LobbyMode()
{
  var self = this;
  self.chat = new Chat();
  self.play = new TextButton("Play",100,450,20);
  self.private_session = new TextButton("Create Game",100,450,75);
  self.lobby = new LobbyEffect();
  self.collision = new Collision();
  self.collision.add(self.play.rect);
  self.collision.add(self.private_session.rect);
  self.collision.effects.add_effect(new LobbyEffects());
  self.display = function()
  {
    background(0,0,0);
    self.chat.display();
    self.play.display();
    self.private_session.display();
    noFill();
    stroke(255);
    rect(0,580,800,20);
    rect(0,0,400,580);
  };
}

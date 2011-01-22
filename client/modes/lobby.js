
function LobbyMode()
{
  var self = this;
  self.chat = new Chat();
  self.play = new TextButton("Play",100,450,20);
  self.session = new TextButton("Create Game",100,450,75);
  self.effect = new LobbyEffects();
  self.collision = new Collision();
  self.effect.add(self.play.rect);
  self.effect.add(self.session.rect);
  self.collision.effects.add_effect(self.effect);
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

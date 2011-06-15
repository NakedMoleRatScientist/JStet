
function LobbyMode()
{
  var self = this;
  self.chat = new Chat();
  self.play = new TextButton("Play",100,450,20);
  self.session = new TextButton("Create Game",100,450,75);
  self.find = new TextButton("Join",100,450,130);
  self.score = new TextButton("High Score", 100, 450, 230);
  self.effect = new LobbyEffects();
  self.collision = new Collision();
  self.effect.add(self.play.rect);
  self.effect.add(self.session.rect);
  self.effect.add(self.find.rect);
  self.collision.effects.add_effect(self.effect);
  self.display = function()
  {
    background(0,0,0);
    self.chat.display();
    self.play.display();
    self.session.display();
    self.find.display();
    noFill();
    stroke(255);
    rect(0,580,800,20);
    rect(0,0,400,580);
  };
  self.key = function()
  {
    var info = typing();
    switch(info)
    {
    default:
      lobby.chat.message.addLetter(info);
      break;
    case -8:
      lobby.chat.message.destroy();
      break;
    case -10:
      lobby.chat.enter();
      break;
    case false:
      return;
      break;
    }
  }; 
}

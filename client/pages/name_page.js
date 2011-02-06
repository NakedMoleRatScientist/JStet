
function NamePage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = true;
  self.initialize = function()
  {
    self.radio_switch = new RadioSwitch();
    self.pages.collision.effects.add(new NameEffects(self.pages));
  };
  self.call = function()
  {
    textFont(font,18);
    self.type_text();
  };
  self.type_text = function()
  {
    text("What do you wish the name of the game to be?",150,210);
    text(self.pages.input.string,170,240);
    text("When you're done, presse enter",180,265); 
  };
  self.confirm_text = function()
  {
    text("Name of the game is.. " + self.pages.data.get("name"),120,210);
    text("Is this the name of the game you wish it to be?",150,210); 
  };
}

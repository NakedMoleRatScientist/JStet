
function NamePage(var pages)
{
  var self = this;
  self.pages = pages;
  self.state = 0;
  self.initialize = function()
  {
    self.yes = new RadioButton();
    self.yes.set(300,220);
    self.no = new RadioButton();
    self.no.set(400,220);
    self.radio_switch = new RadioSwitch();
    self.radio_switch.add(self.yes);
    self.radio_switch.add(self.no);
    self.submit = new TextButton("Submit",100,350,270);
    self.name = new NameEffects(self.pages);
    self.submit_effects = new SubmitEffects(self.pages,self.radio_switch);
    self.submit_effects.add(self.submit.rect);
    self.pages.collision.effects.add_effect(self.name);
    self.pages.collision.effects.add_effect(self.radio_switch);
    self.pages.collision.effects.add_effect(self.submit_effects);
  };
  self.call = function()
  {
    textFont(font,18);
    if (self.state == 0)
    {
      self.name.type = true;
      self.type_text();
    }
    else
    {
      self.name.type = false;
      self.confirm_text();
    }
  };
  self.type_text = function()
  {
    text("What do you wish the name of the game to be?",150,210);
    text(self.name.input.string,170,240);
    text("When you're done, presse enter",180,265);
    rect(170,220,400,25);
  };
  self.confirm_text = function()
  {
    text("Name of the game is.. " + self.pages.data.get("name"),150,190);
    text("Is this the name of the game you wish it to be?",150,210);
    self.yes.text("Yes");
    self.yes.display();
    self.no.text("No");
    self.no.display();
    self.submit.display();
  };
  self.act = function()
  {
    if (self.state == 0)
    {
      self.state = 1;
    }
    else
    {
      self.state = 0;
    }
  };
}

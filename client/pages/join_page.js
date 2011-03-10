
function JoinPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = false;
  self.pointer = 0;
  self.initialize = function()
  {
    self.pointer = self.pages.data.get("pointer");
    self.yes = new TextButton("Yes",100,300,300);
    self.no = new TextButton("No",100,400,300);
  };
  self.call = function()
  {
    textFont(font,18);
    text("Do you wish to join this game",350,280);
    self.yes.display();
    self.no.display();
  };
}

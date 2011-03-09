
function JoinPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = false;
  self.state = 0;
  self.initialize = function()
  {
    self.yes = new TextButton("Yes",100,100,100);
    self.no = new TextButton("No",100,200,100);
  };
  self.call = function()
  {
    textFont(font,18);
    self.yes.display();
    self.no.display();
  };
}

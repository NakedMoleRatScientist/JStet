
function JoinPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = true;
  self.state = 0;
  self.initialize = function()
  {
    self.yes = new TextButton("Yes",100,100,100);
    self.no = new TextButton("No",100,200,100);
  };
}

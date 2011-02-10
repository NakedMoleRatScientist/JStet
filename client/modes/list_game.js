
function ListGameMode()
{
  var self = this;
  self.refresh = new TextButton("Refresh",100,450,20);
  self.display = function()
  {
    background(0,0,0);
    stroke(255);
    refresh.display();
  };
}

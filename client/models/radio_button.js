
function RadioButton()
{
  var self = this;
  self.state = -1;
  self.choice = 0;
  self.height = 10;
  self.width = 10;
  self.radius = self.height / 2;
  self.diameter = self.radius * 2;
  self.x = 0;
  self.y = 0;
  self.set = function(var x, var y)
  {
    self.x = x;
    self.y = y;
  };
  self.display = function()
  {
    stroke(255);
    ellipse(self.x,self.y,self.width,self.height);
    if (self.state == self.choice)
    {
      stroke(0);
      ellipse(x,y,self.width / 2, self.height / 2);
    }
  };
  self.text = function(var message)
  {
    text(message,self.x + 15,self.y + 5);
  };
}

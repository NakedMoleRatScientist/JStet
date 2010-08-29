
function RadioButton()
{
  var self = this;
  self.state = false;
  self.height = 10;
  self.width = 10;
  self.x = 0;
  self.y = 0;
  self.set(var x, var y)
  {
    self.x = x;
    self.y = y;
  }
  self.display = function()
  {
    stroke(255);
    ellipse(x,y,self.width,self.height);
    if (self.state == true)
    {
      stroke(0);
      ellipse(x,y,self.width / 2, self.height / 2);
    }
  };
  self.text = function(var message)
  {
    text(message,self.width + 15,self.height);
  };
}
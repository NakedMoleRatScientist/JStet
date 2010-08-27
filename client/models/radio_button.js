
function RadioButton()
{
  var self = this;
  self.state = false;
  self.display = function()
  {
    stroke(255);
    ellipse(x,y,self.width,self.height);
  };
}
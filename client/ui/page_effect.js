
function PageEffect(var pages)
{
  var self = this;  
  self.pages = pages;
  self.buttons = [];
  self.add = function(var button)
  {
    self.buttons.push(button);
  };
}


function PageEffect(var pages)
{
  var self = this;  
  self.pages = pages;
  self.button = [];
  self.add = function(var button)
  {
    self.buttons.push(button);
  };
}

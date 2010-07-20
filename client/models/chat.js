
function Chat()
{
  var self = this;
  self.messages = new Array();
  self.message = new Text();
  self.protocol = null;
  self.display = function()
  {
    var y = 20;
    for (var i = 0;i < self.messages.length;i++)
    {
      text(self.messages[i],250,y+= 20);
    }

  };
  self.enter = function()
  {
    self.messages.push(self.message.get_text());
  };
}
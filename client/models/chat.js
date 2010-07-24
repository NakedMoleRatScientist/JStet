
function Chat()
{
  var self = this;
  self.messages = new Array();
  self.message = new Text();
  self.protocol = null;
  self.scroll = 0;
  self.display = function()
  {
    var y = 20;
    for (var i = 0;i < self.messages.length;i++)
    {
      text(self.messages[i],20,y+= 20);
    }
    text(self.message.get_text(),5,600);
  };
  self.enter = function()
  {
    self.protocol.send(self.message.get_text());
    self.message = new Text();
  };
  self.add_message = function(msg)
  {
    self.messages.push(msg);
  };
}

function Chat()
{
  var self = this;
  self.messages = new Array();
  self.message = new Text();
  self.enter = function()
  {
    self.messages.push(self.message.get_text());
  };
}
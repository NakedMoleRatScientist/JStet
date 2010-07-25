
function Chat()
{
  var self = this;
  self.messages = new Array();
  self.message = new Text();
  self.protocol = null;
  self.scroll = 0;
  self.limit = 550;
  self.display = function()
  {
    var y = 20;
    for (var i = self.scroll;i < self.messages.length;i++)
    {
      text(self.messages[i],0,y+= 20);
      if (y >= 550)
      {
	y -= 20;
	return;
      }
    }
    text(self.message.get_text(),5,600);
  };
  self.down = function()
  {
    self.scroll += 1;
  };
  self.up = function()
  {
    self.scroll -= 1;
  };
  self.enter = function()
  {
    self.protocol.send(self.message.get_text());
    self.message = new Text();
  };
  self.add_message = function(msg)
  {
    if (msg.length > 35)
    {
      console.log("too long");
    }
    self.messages.push(msg);
  };
}
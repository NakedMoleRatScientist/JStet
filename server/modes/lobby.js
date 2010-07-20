
function LobbyMode()
{
  var self = this;
  self.message = new Array();
  self.add_message = function(msg)
  {
    self.message.push(msg);
  };
}
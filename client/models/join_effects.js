
function JoinEffects(var page)
{
  var self = this;
  self.page = page;
  self.effect = new Effect(self);
  self.check = function(var object)
  {
    switch (object.type)
    {
    case 0:
      if (object.member == 1)
      {
	console.log("beep");
      }
      break;
    }
  };
}

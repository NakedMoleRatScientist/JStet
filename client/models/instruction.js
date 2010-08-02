function Instruction()
{
  var self = this;
  self.display = function()
  {
    text("Instruction: ",50,500);
    text("a - left",50,530);
    text("s - down",50,550);
    text("d - right",50,570);
    text("w - rotate",50,590);
  };
}
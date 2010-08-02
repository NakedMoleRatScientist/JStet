function Instruction()
{
  var self = this;
  self.display = function()
  {
    text("Instruction: ",50,450);
    text("a - left",50,480);
    text("s - down",50,500);
    text("d - right",50,520);
    text("w - rotate",50,540);
  };
}
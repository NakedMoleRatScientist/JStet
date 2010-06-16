
function PlayField()
{
  self = this;
  self.create_field = function()
  {
    var field = new Array(10);
    for (x = 0; x < 10; x++)
    {
      field[x] = new Array(20);
      for (y = 0; y < 20; y++)
      {
        field[x][y] = 0;
      }
    }
    return field;
  };
  //Get a list of qualified blocks to the field.
  self.get_list = function(blocks)
  {
    var coord = new Array();
    for (var x = 0; x < 4; x++)
    {
      for(var y = 0; y < 4; y++)
      {
        if (blocks[x][y] == 1)
        {
          coord.push([x,y]);
        }
      }
    }
    return coord;
  };
  self.calculate_positions = function(c,r)
  {
    var x = c / 20;
    var y = r / 20;
    return [x,y];
  };
  //collision detection
  self.check = function(blocks,x_offset,y_offset)
  {
    for (i = 0; i < 4; i++)
    {
      if (self.field[blocks[i][0] + x_offset][blocks[i][1] + y_offset] != 0)
      {
        return false;
      }
    }
    return true;
  };
  //Add blocks to the field and encode color information
  self.insert_blocks = function(blocks,c,r,color)
  {
    var offset = self.calculate_positions(c,r);
    var list = self.get_list(blocks);
    for (var i = 0; i < 4; i++)
    {
      self.field[list[i][0] + offset[0]][list[i][1] + offset[1]] = color;
    }
  };
  //move line down
  self.move_lines = function(line)
  {
    if (line == false)
    {
      return false;
    }
    for (y = line; y > 1; y--)
    {
      for (x = 0; x < 10; x++)
      {
        self.field[x][y] = self.field[x][y - 1]
      }
    }
    return true;
  };
  //delete a line
  self.clear_line = function(line)
  {
    if (line == false)
    {
      return false;
    }
    for (x = 0; x < 10; x++)
    {
      self.field[x][line] = 0;
    }
    return line;
  };
  self.check_field = function()
  {
    var line = 0;
    var score = 0;
    for (y = 0; y < 20; y++)
    {
      score = 0;
      for (x = 0; x < 10; x++)
      {
        if(self.field[x][y] != 0)
        {
          score ++;
        }
        else
        {
          x = 10;
        }
        if (score == 10)
        {
          return line;
        }
      }
      line ++;
    }
    return false;
  };
  self.field = self.create_field();
}

var sys = require('sys');
var couch = require('cradle');
var db = new(couch.Connection)().database('server');

var document =
  {
    names: new Array(100),
    scores: new Array(100),
    status: false
  }

for (var i = 0; i < 100; i++)
{
  document.names[i] = "nothing";
  document.scores[i] = 0;
}

function modifyList(n,name,points)
{
  document.scores[n] = points;
  document.names[n] = name;
}

function moveList(n)
{
  if (n + 1 < 100)
  {
    score = document.scores[n];
    name = document.names[n];
    document.scores[n + 1] = score;
    document.names[n + 1] = name;
  }
}

exports.add_to_list = function(name,points)
{
  for (var n = 0; n < 100; n++)
  {
    if (document.names[n] == "nothing")
    {
      modifyList(n,name,points);
      sys.log("Position " + n);
      return;
    }
    else if (document.scores[n] < points)
    {
      moveList(n);
      modifyList(n,name,points);
      sys.log("Position " + n);
      return;
    }
  } 
}


exports.get_lowest = function(points)
{
  for (var i = 0;i < 100;i++)
  {
    if (document.names[i] == "nothing")
    {
      return document.scores[i];
    }
    else if(document.scores[i] < points)
    {
      return document.scores[i];
    }
  }
  return document.scores[i];
}

exports.create = function()
{
  db.save('score', document,function(er,ok) {
     if (er) throw new Error(JSON.stringify(er));
    sys.puts("create score");
  });
}

exports.save = function()
{
  exports.getRev(function(rev){
    document._rev = rev;
    sys.puts("save score");
    db.save('score',document,function(er,ok){
      if (er) throw new Error(JSON.stringify(er));
    });
  });
}

exports.destroy = function()
{
  db.get('score',function(er,doc){
    if (er) throw new Error(JSON.stringify(er));
    sys.puts("destroy a document");
    db.remove(doc._id,doc._rev);
  });
}

exports.getRev = function(callback)
{
  db.get('score',function(er,doc){
    if (er) throw new Error(JSON.stringify(er));
    rev = doc._rev;
    callback(rev);
  })
}
exports.readDoc = function(callback)
{
  db.get('score',function(er,doc){
    if (er) throw new Error(JSON.stringify(er));
    document = doc;
    sys.log("Read.");
    callback(document);
  });
}

exports.getDoc = function()
{
  return document;
}

exports.use_db = function(name)
{
  db = new(cradle.Connection)().database(name);
}

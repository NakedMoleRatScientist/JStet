var sys = require('sys')
var couch = require('node-couchdb/lib/couchdb')
var client = couch.createClient(5984,'localhost');
var db = client.db('server')

var document =
  {
    names: new Array(100),
    scores: new Array(100),
  }

for (i = 0; i < 100; i++)
{
  document.names[i] = "nothing";
  document.scores[i] = 0;
}

exports.add_to_list = function(name,points)
{
  if (document.key != 100)
  {
    document.names[document.key] = name;
    document.scores[document.key] = points;
    document.key += 1;
  }
  sys.puts("add to the list of highscores");
}

exports.create = function()
{
  db.saveDoc('score', document,function(er,ok) {
     if (er) throw new Error(JSON.stringify(er));
    sys.puts("create score");
  });
}

exports.save = function()
{
  exports.getRev(function(rev){
    document._rev = rev;
    sys.puts("save score");
    db.saveDoc('score',document,function(er,ok){
      if (er) throw new Error(JSON.stringify(er));
    });
  });
}

exports.destroy = function()
{
  db.getDoc('score',function(er,doc){
    if (er) throw new Error(JSON.stringify(er));
    sys.puts("destroy a document")
    db.removeDoc(doc._id,doc._rev);
  });
}

exports.getRev = function(callback)
{
  db.getDoc('score',function(er,doc){
    if (er) throw new Error(JSON.stringify(er));
    rev = doc._rev;
    callback(rev);
  })
}
exports.readDoc = function(callback)
{
  db.getDoc('score',function(er,doc){
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
  db = client.db(name);
}
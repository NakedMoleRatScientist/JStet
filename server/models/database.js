var sys = require('sys')
var couch = require('node-couchdb/lib/couchdb')
var client = couch.createClient(5984,'localhost');
var db = client.db('server')

var document =
  {
    names: [],
    scores: [],
  }

exports.add_to_list = function(name,points)
{
  document.names << name;
  document.scores << points;
  sys.puts("add to the list of highscores");
}

exports.create = function()
{
  db.saveDoc('score', document,function(er,ok) {
     if (er) throw new Error(JSON.stringify(er));
    sys.puts("save a document");
  });
}

exports.save = function()
{
  exports.getRev(function(rev){
    document._rev = rev;
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
exports.getDoc = function(callback)
{
  db.getDoc('score',function(er,doc){
    if (er) throw new Error(JSON.stringify(er));
    document = doc;
    callback(document);
  });

}
exports.use_db = function(name)
{
  db = client.db(name);
}

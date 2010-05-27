var sys = require('sys')
var couch = require('node-couchdb/lib/couchdb')
var client = couch.createClient(5984,'localhost');
var db = client.db('server')

var document =
  {
    names: [],
    scores: []
  }

exports.add_to_list = function(name,points)
{
  document.names << name;
  document.scores << points;
}

exports.save = function()
{
  db.saveDoc('score', document,function(er,ok) {
    if (er) throw new Error(JSON.stringify(er));
    sys.puts("save a document");
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

exports.getList = function()
{
  db.getDoc('score',function(er,doc){
    if (er) throw new Error(JSON.stringify(er));
    for(var i = 0; i < doc._names.size();i++)
    {
      document.names << doc._names[i];
      document.scores << doc._scores[i];
    }
  });
  return document;
}
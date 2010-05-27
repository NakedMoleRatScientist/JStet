var sys = require('sys')
var couch = require('node-couchdb/lib/couchdb')
var client = couch.createClient(5984,'localhost');
var db = client.db('server')

exports.create = function()
{
  db.saveDoc('score', {name: 'Test', points: 10},function(er,ok) {
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
}
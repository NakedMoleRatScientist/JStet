assert = require('assert');
var sys = require("sys");
var db = require('../server/models/database');

db.use_db('test');

function setup(callback)
{
  db.add_to_list("blah",10);
  db.add_to_list("great",20);
  db.save();
  callback();
}

setup(function test(){
  db.getDoc(function(doc){
    sys.puts("test if names size is two");
    assert.ok(doc.names.length == 2);
    sys.puts("test if names[0] is equal to great");
    assert.ok(doc.names[0] == "great");
  });
});

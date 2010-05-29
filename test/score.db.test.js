assert = require('assert');
var sys = require("sys");
var db = require('../server/models/database');

db.use_db('test');

function add(callback)
{
  db.add_to_list("blah",10);
  db.add_to_list("great",20);
  callback();
}

function setup(callback)
{
  db.save();
  callback();
}

setup(function test(){
  db.getDoc(function(doc){
    sys.puts("test if key number is two");
    assert.ok(doc.key == 2);
    sys.puts("test if names[0] is equal to great");
    assert.ok(doc.names[0] == "great");
  });
});

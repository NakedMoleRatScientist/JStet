assert = require('assert');
var db = require('../server/models/database');

db.use_db('test');

function setup()
{
  db.add_to_list("blah",10);
  db.add_to_list("great",20);
}


test_for_size = function(callback)
{
  db.getDoc(function(doc){
    sys.puts("test if names size is two")
    assert.ok(doc.names.size == 2);
  });
}

setup(function(){
  test_for_size();
});

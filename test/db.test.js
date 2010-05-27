assert = require('assert');
var db = require('../server/models/database');

db.use_db('test');

function setup()
{
  db.add_to_list("blah",10);
  db.add_to_list("great",20);
}
setup();
assert.ok(db.getList().name.size == 2);
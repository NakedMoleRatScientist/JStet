assert = require('assert');
var db = require('../server/models/database');

db.use_db('test');

function setup()
{
  db.add_to_list("blah",10);
  db.add_to_list("great",20);
}
setup();
document = db.getList();
assert.ok(document.names.size == 2);
assert = require('assert');
var db = require('../server/models/database');

db.use_db('test');
assert.ok(db.getList().name.size == 2);
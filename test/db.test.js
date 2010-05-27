assert = require('assert')
var db = require('../server/models/database')

assert.ok(db.getList().name.size == 2)
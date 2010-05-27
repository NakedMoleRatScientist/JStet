var db = require('server/models/database')

assert.ok(db.getList().size == 2)
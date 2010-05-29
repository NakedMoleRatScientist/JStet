var db = require('../server/models/database');
db.use_db('test');

db.destroy();
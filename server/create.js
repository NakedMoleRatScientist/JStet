var sys = require('sys');
var cradle = require('cradle');
var c = new (cradle.Connection);

var db = c.database('server');
db.create();

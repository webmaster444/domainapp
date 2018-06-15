var level = require('level');  
var path = require('path');  
var sublevel = require('level-sublevel');

var dbPath = process.env.DB_PATH || path.join(__dirname, 'models');  
var db = sublevel(level(dbPath, {  
  valueEncoding: 'json'
}));

exports.base = db;  
exports.models = db.sublevel('models');
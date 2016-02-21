var marked = require('../tool/MarkdownConverter');
var config = require('../config/Config');
var DBHelper = require('../module/DBHelper');
var mysql = require('mysql');
var db = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  debug: config.db.debug
});


var dBHelper = new DBHelper(db);
var sql = {
  table: 'contents',
  resultColumns: ['text'],
  queryColumns: ['cid'],
  queryData: [1],
  actionType: 'query'
};

dBHelper.execute(sql, function(err, result) {
  if (result[0]) {
    console.log(marked(result[0].text).title);
  }
});

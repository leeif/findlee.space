var util = require('util');
var Base = require('./BaseModule');
var sqlGenerator = require('../tool/GCTWUtils').sqlGenerator;

/**
 * @author lee
 * @param {db:database pool object}
 */
function DBHelper(db) {
  Base.call(this, db);
}

util.inherits(DBHelper, Base);

DBHelper.prototype.insert = function(sqlData, callback, connection) {
  var self = this;
  var sql = sqlGenerator.insert(sqlData.table,
    sqlData.insertColumns,
    sqlData.insertData);
  var db = connection !== undefined ? connection : self.db;
  db.query(sql, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

DBHelper.prototype.update = function(sqlData, callback, connection) {
  var self = this;
  var sql = '';
  var db = connection !== undefined ? connection : self.db;
  db.query(sql, function(err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }

  });
};

DBHelper.prototype.query = function(sqlData, callback, connection) {
  var self = this;
  var sql = sqlGenerator.query(sqlData.table,
    sqlData.resultColumns,
    sqlData.join,
    sqlData.queryColumns,
    sqlData.queryData,
    sqlData.group);
  var db = connection !== undefined ? connection : self.db;
  db.query(sql, function(err, results) {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

DBHelper.prototype.delete = function(sqlData, callback, connection) {

};

module.exports = DBHelper;

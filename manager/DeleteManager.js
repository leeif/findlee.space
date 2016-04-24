var Base = require('./BaseManager');
var util = require('util');
var co = require('co');
var managerInstance = null;

function DeleteManager(db, redis) {
  Base.call(this, db, redis);
}

util.inherits(DeleteManager, Base);

DeleteManager.prototype.deleteTag = function(mid, callback) {
  var sqlData = {
    sql: 'delete from metas, relationships ' +
      'using metas left join relationships on relationships.mid = metas.mid where metas.mid = ' +
      mid,
    actionType: 'delete',
  };
  this.dBExecute(sqlData).then(function(result) {
    console.log(result);
    callback(null, result);
  }, function(err) {
    console.log(err);
    callback(err);
  });
};

DeleteManager.prototype.deleteRelationship = function(relationships, callback) {
  var self = this;
  var result;
  co(function*() {
    try {
      result = yield self.dBExecute({
        sql: 'delete from relationships where cid = ' + relationships.cid + ' and ' +
          'mid = ' + relationships.mid,
        actionType: 'delete'
      });
    } catch (err) {
      throw err;
    }
    return result;
  }).then(function(result) {
    callback(null, {
      status: 200
    });
  }, function(err) {
    console.log(err);
    callback({
      status: 500
    });
  });
};

module.exports = function() {
  return function(db, redis) {
    if (managerInstance === null) {
      managerInstance = new DeleteManager(db, redis);
    }
    return managerInstance;
  };
};

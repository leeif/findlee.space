var Base = require('./base_manager');
var util = require('util');
var co = require('co');
var managerInstance = null;

function DeleteManager(db, redis) {
  Base.call(this, db, redis);
}

util.inherits(DeleteManager, Base);

DeleteManager.prototype.deleteTag = function(mid, callback) {
  var self = this;
  var sqlData = {};
  sqlData.where = {
    mid: mid
  };
  co(function*() {
    try {
      yield self.db.metas.delete(sqlData);
      return;
    } catch (err) {
      throw err;
    }
  }).then(function(result) {
    onSuccess(result);
  }, function(err) {
    console.log(err);
    onError(err);
  });
  function onError(err) {
    callback({
      status: 500,
      err: err.msg
    });
  }
  
  function onSuccess(result) {
    callback(null, {
      status: 200
    });
  }
};

DeleteManager.prototype.deleteRelationship = function(relationship, callback) {
  var self = this;
  var sqlData = {};
  sqlData.where = {
    cid: relationship.cid,
    mid: relationship.mid
  };
  co(function*() {
    try {
      yield self.db.relationships.delete(sqlData);
      return;
    } catch (err) {
      throw err;
    }
  }).then(function(result) {
    onSuccess(result);
  }, function(err) {
    console.log(err);
    onError(err);
  });
  function onError(err) {
    callback({
      status: 500,
      err: err.msg
    });
  }
  
  function onSuccess(result) {
    callback(null, {
      status: 200
    });
  }
};

module.exports = function() {
  return function(db, redis) {
    managerInstance = new DeleteManager(db, redis);
    return managerInstance;
  };
};

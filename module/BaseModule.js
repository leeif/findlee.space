function Base (db) {
	//db connection pool object
  this.db = db;
}

Base.prototype.setDB = function(db){
  this.db = db;
};

Base.prototype.getDB = function(){
  return this.db;
};

Base.prototype.getConnection = function(callback){
  this.db.getConnection(function(err, connection){
  	callback(connection);
    connection.release();
  });
};

Base.prototype.execute = function(data, callback, connection){
  var self = this;
  var fun = data.actionType;
  if(typeof self[fun] === 'function'){
    self[fun](data, callback, connection);
  }
};

module.exports = Base;
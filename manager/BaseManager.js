function BaseManager(db, redis){
  this.redis = redis;
  this.db = db;
}

module.exports = BaseManager;
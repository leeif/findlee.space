var DBHelper = require('../module/DBHelper');
function BaseManager(db, redis){
  this.redis = redis;
  this.dBHelper = new DBHelper(db);
}

module.exports = BaseManager;
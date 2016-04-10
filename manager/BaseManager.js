var DBHelper = require('../module/DBHelper');
var gctwUtils = require('../tool/GCTWUtils');

function BaseManager(db, redis){
  this.redis = redis;
  this.dBHelper = new DBHelper(db);
}

BaseManager.prototype.sqlEscape = function(sql){
	return gctwUtils.sqlEscape(sql);
};

BaseManager.prototype.dBExecute = function(sqlData){
	var dBExecute = gctwUtils.promisify(this.dBHelper, this.dBHelper.execute);
	return dBExecute(sqlData);
};

module.exports = BaseManager;
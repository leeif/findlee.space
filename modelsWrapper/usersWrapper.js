var db = require('../models');
function UsersWrapper(){
  this.users = db.users;
}

UsersWrapper.prototype.queryOrInsert = function(option){
  return this.users.findOrCreate(option);
};

UsersWrapper.prototype.query = function(option){
  return this.users.findAll(option);
};

module.exports = function(){
	return new UsersWrapper();
};


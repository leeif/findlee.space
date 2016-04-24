var db = require('../models');
function UsersWrapper(){
  this.users = db.users;
}

module.exports = function(){
	return new UsersWrapper();
};


var db = require('../models');
function MetasWrapper(){
  this.metas = db.metas;
}

module.exports = function(user , sequelize){
	return new MetasWrapper(user, sequelize);
};
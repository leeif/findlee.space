var db = require('../models');
function RelationshipsWrapper(){
  this.relationships = db.relationships;
}


module.exports = function(){
	return new RelationshipsWrapper();
};
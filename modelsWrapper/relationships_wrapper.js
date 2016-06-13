var db = require('../models');

function RelationshipsWrapper() {
  this.relationships = db.relationships;
}

RelationshipsWrapper.prototype.bulkInsert = function(option) {
  return this.relationships.bulkCreate(option);
};

RelationshipsWrapper.prototype.queryOrInsert = function(option) {
  return this.relationships.findOrCreate(option);
};

RelationshipsWrapper.prototype.insert = function(option) {
  return this.relationships.create(option);
};

RelationshipsWrapper.prototype.delete = function(option) {
  return this.relationships.destroy(option);
};

RelationshipsWrapper.prototype.update = function(option) {

};


module.exports = function() {
  return new RelationshipsWrapper();
};

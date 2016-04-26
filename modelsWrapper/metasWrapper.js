var db = require('../models');

function MetasWrapper() {
  this.metas = db.metas;
}

MetasWrapper.prototype.query = function(option) {
  return this.metas.findAll(option);
};

MetasWrapper.prototype.queryOrInsert = function(option) {
  return this.metas.findOrCreate.call(this.metas, option);
};

MetasWrapper.prototype.bulkInsert = function(option) {
  return this.metas.bulkCreate(option);
};

MetasWrapper.prototype.insert = function(option) {
  return this.metas.create(option);
};

MetasWrapper.prototype.delete = function(option) {
  return this.metas.destroy(option);
};

module.exports = function(user, sequelize) {
  return new MetasWrapper(user, sequelize);
};

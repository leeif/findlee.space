var db = require('../models');
function ContentsWrapper() {
  this.contents = db.contents;
}

ContentsWrapper.prototype.query = function(option) {
  return this.contents.findAll(option);
};

ContentsWrapper.prototype.insert = function(model) {
  return this.contents.create(model);
};

ContentsWrapper.prototype.update = function(attributes, where) {
   return this.contents.update(attributes, where);
};

ContentsWrapper.prototype.delete = function(option) {
  return this.contents.destroy(option);
};

module.exports = function() {
  return new ContentsWrapper();
};

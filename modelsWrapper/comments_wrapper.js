var db = require('../models');
function CommentsWrapper(){
  this.comments = db.comments;
}

CommentsWrapper.prototype.query = function(option) {
  return this.comments.findAll(option);
};

CommentsWrapper.prototype.insert = function(model) {
  return this.comments.create(model);
};

CommentsWrapper.prototype.update = function(attributes, where) {
   return this.comments.update(attributes, where);
};

CommentsWrapper.prototype.delete = function(option) {
  return this.comments.destroy(option);
};

module.exports = function(user , sequelize){
	return new CommentsWrapper(user, sequelize);
};

